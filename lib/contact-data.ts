import fs from "fs/promises"
import path from "path"

const CONTACTS_FILE = path.join(process.cwd(), "data", "contacts.json")

export interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  createdAt: string
  status: "unread" | "read"
}

async function ensureContactsFile() {
  try {
    await fs.access(CONTACTS_FILE)
  } catch {
    await fs.writeFile(CONTACTS_FILE, JSON.stringify([], null, 2))
  }
}

export async function getContacts(): Promise<ContactMessage[]> {
  try {
    await ensureContactsFile()
    const data = await fs.readFile(CONTACTS_FILE, "utf-8")
    return JSON.parse(data)
  } catch (error) {
    console.error("Error reading contacts:", error)
    return []
  }
}

export async function saveContact(contactData: Omit<ContactMessage, "id" | "createdAt" | "status">): Promise<ContactMessage> {
  try {
    await ensureContactsFile()
    const contacts = await getContacts()
    
    const newContact: ContactMessage = {
      id: Date.now().toString(),
      ...contactData,
      createdAt: new Date().toISOString(),
      status: "unread",
    }
    
    contacts.push(newContact)
    await fs.writeFile(CONTACTS_FILE, JSON.stringify(contacts, null, 2))
    
    return newContact
  } catch (error) {
    console.error("Error saving contact:", error)
    throw error
  }
}

export async function updateContactStatus(id: string, status: "read" | "unread"): Promise<void> {
  try {
    await ensureContactsFile()
    const contacts = await getContacts()
    
    const updatedContacts = contacts.map(contact =>
      contact.id === id ? { ...contact, status } : contact
    )
    
    await fs.writeFile(CONTACTS_FILE, JSON.stringify(updatedContacts, null, 2))
  } catch (error) {
    console.error("Error updating contact status:", error)
    throw error
  }
}

export async function deleteContact(id: string): Promise<void> {
  try {
    await ensureContactsFile()
    const contacts = await getContacts()
    
    const filteredContacts = contacts.filter(contact => contact.id !== id)
    await fs.writeFile(CONTACTS_FILE, JSON.stringify(filteredContacts, null, 2))
  } catch (error) {
    console.error("Error deleting contact:", error)
    throw error
  }
}
