# Contact Form & Email System Setup

This portfolio now includes a complete contact form system that:
- ✅ Saves messages to a database (JSON file)
- ✅ Sends email notifications to your inbox
- ✅ Sends confirmation emails to visitors
- ✅ Admin panel to view and manage all messages

## Setup Instructions

### 1. Email Configuration

#### Using Gmail (Recommended)

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification** (if not already enabled)
3. Go to [App Passwords](https://myaccount.google.com/apppasswords)
   - Select "Mail" and "Windows Computer"
   - Copy the generated 16-character password
4. Create a `.env.local` file in your project root:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-16-character-app-password
EMAIL_SERVICE=gmail
EMAIL_FROM=your-email@gmail.com
```

#### Using Other Email Services

- **Outlook**: Set `EMAIL_SERVICE=outlook`
- **Yahoo**: Set `EMAIL_SERVICE=yahoo`
- **Custom SMTP**: Update the transporter in `/lib/email-service.ts`

### 2. Features

#### Contact Form (Public)
- Located on the main portfolio page
- Visitors can submit: Name, Email, Subject, Message
- Messages automatically saved to `data/contacts.json`
- Emails sent to your inbox
- Confirmation email sent to visitor

#### Admin Panel (Protected)
- Access at `/messages` (must be logged in as admin)
- View all contact submissions
- See unread/read status
- Reply to messages via email
- Delete messages
- Track statistics (total, unread, read)

#### Message Management
- Messages marked as "unread" by default
- Automatically marked as "read" when opened
- All messages stored in `data/contacts.json`
- Delete unwanted messages

### 3. Integration

#### API Endpoints

**POST /api/contact** - Submit a contact form
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Collaboration",
  "message": "I'd like to work with you..."
}
```

**GET /api/contact** - Get all messages (admin only)

**DELETE /api/contact** - Delete a message
```json
{
  "id": "message-id"
}
```

**PATCH /api/contact** - Update message status
```json
{
  "id": "message-id",
  "status": "read" | "unread"
}
```

### 4. Viewing Messages

1. Login to admin panel with credentials:
   - Email: `admin@portfolio.com`
   - Password: `admin123`

2. Navigate to `/messages`

3. View all contact form submissions with:
   - Sender name and email
   - Message subject and content
   - Date and time received
   - Read/Unread status

### 5. File Structure

```
├── app/
│   ├── api/contact/route.ts          # Contact API endpoint
│   └── messages/page.tsx              # Admin messages dashboard
├── lib/
│   ├── contact-data.ts                # Message database management
│   └── email-service.ts               # Email sending service
├── data/
│   └── contacts.json                  # Messages database
├── components/
│   └── contact-section.tsx            # Contact form component
├── .env.example                       # Environment variables template
└── .env.local                         # Your actual environment variables (create this)
```

### 6. Testing

1. **Test locally**: Run `npm run dev` and visit `http://localhost:3000`
2. **Submit a test message** through the contact form
3. **Check your inbox** for notification email
4. **Check visitor's inbox** for confirmation email
5. **View in admin panel** at `/messages` (login as admin)

### 7. Troubleshooting

**"Email failed to send" error**
- Verify `.env.local` file exists with correct credentials
- Check app-specific password for Gmail
- Ensure 2-Step Verification is enabled on Gmail
- Try sending a test email

**Messages not saving**
- Ensure `data/` folder exists
- Check file permissions on `data/contacts.json`
- Verify API response in browser console

**Can't access messages page**
- Must be logged in as admin (`admin@portfolio.com` / `admin123`)
- Check `/login` page first
- Ensure you have admin role set

### 8. Production Deployment

When deploying to production:

1. Update `.env.local` with production email credentials on your hosting platform
2. Use environment variables from your hosting provider (Vercel, Netlify, etc.)
3. Consider using a dedicated email service:
   - **SendGrid** - Free tier available
   - **Mailgun** - Better deliverability
   - **AWS SES** - Scalable solution

### 9. Security Notes

- Never commit `.env.local` to version control
- Use app-specific passwords for Gmail
- Consider adding rate limiting for contact form
- Add CAPTCHA for production (optional)
- Store sensitive data securely

## Support

For issues with email sending, check:
1. Email service credentials in `.env.local`
2. Network connectivity
3. Email service provider status
4. Spam/junk folder for test emails
