"use client"

import { useState } from "react"
import { Mail, Phone, MapPin, Send, Linkedin, Github, Facebook } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const contactInfo = [
  {
    icon: MapPin,
    title: "Address",
    value: "Tbong Khmum Province, Cambodia",
  },
  {
    icon: Mail,
    title: "Email",
    value: "oeunchhinh@gmail.com",
    href: "mailto:oeunchhinh@gmail.com",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "0884395053",
    href: "tel:0884395053",
  },
]

const socialLinks = [
  { icon: Linkedin, href: "https://linkedin.com/in/mr-chhinh", label: "LinkedIn" },
  { icon: Github, href: "https://github.com/mrbob101signal-bit/my_portfolio", label: "GitHub" },
  { icon: Facebook, href: "https://facebook.com/pu.chhinh", label: "Facebook" },
]

export function ContactSection() {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [status, setStatus] = useState("")

  // Update form state
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Submit form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus("Sending...")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (res.ok) {
        setStatus("Message sent successfully!")
        setFormData({ name: "", email: "", subject: "", message: "" })
        // Clear success message after 5 seconds
        setTimeout(() => setStatus(""), 5000)
      } else {
        setStatus(data.error || "Failed to send message.")
      }
    } catch (err) {
      console.error(err)
      setStatus("Error sending message.")
    }
  }

  return (
    <section id="contact" className="py-24 px-6 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-sm font-medium tracking-widest uppercase text-accent mb-3">Get In Touch</h2>
          <p className="text-3xl md:text-4xl font-bold text-foreground">Contact Me</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold text-foreground mb-6">Let's talk about everything!</h3>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Feel free to reach out for collaboration, opportunities, or just a friendly chat. I'm always open to
              discussing new projects and creative ideas.
            </p>

            <div className="space-y-6 mb-8">
              {contactInfo.map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{item.title}</h4>
                    {item.href ? (
                      <a href={item.href} className="text-muted-foreground hover:text-accent transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-muted-foreground">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Follow Me</h4>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 border border-border flex items-center justify-center hover:bg-accent hover:border-accent hover:text-white transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card border border-border p-8">
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid sm:grid-cols-2 gap-5">
                <Input
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border-border bg-background focus:border-accent rounded-none h-12"
                  required
                />
                <Input
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border-border bg-background focus:border-accent rounded-none h-12"
                  required
                />
              </div>
              <Input
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                className="border-border bg-background focus:border-accent rounded-none h-12"
                required
              />
              <Textarea
                name="message"
                placeholder="Message"
                rows={6}
                value={formData.message}
                onChange={handleChange}
                className="border-border bg-background focus:border-accent rounded-none resize-none"
                required
              />
              <Button
                type="submit"
                className="w-full bg-accent text-white hover:bg-accent/90 rounded-none h-12 font-medium"
              >
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </Button>
              {status && <p className="mt-2 text-sm text-foreground">{status}</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
