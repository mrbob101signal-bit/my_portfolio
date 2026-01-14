# Dynamic Portfolio System

Your portfolio has been upgraded to a fully dynamic system! You can now update all your information without touching the code.

## How It Works

### Data Structure
All your portfolio data is stored in `/data/portfolio.json`. This is the single source of truth for all your portfolio information.

### API Endpoints
The following API routes handle data retrieval and updates:

- **GET/PUT `/api/portfolio/about`** - About section data
- **GET/POST/PUT `/api/portfolio/experience`** - Experience entries
- **GET/PUT `/api/portfolio/education`** - Education entries
- **GET/POST/DELETE `/api/portfolio/skills`** - Skills management

### Components
All frontend components now fetch data dynamically:
- `components/about-section.tsx` - Uses `/api/portfolio/about`
- `components/experience-section.tsx` - Uses `/api/portfolio/experience`
- `components/education-section.tsx` - Uses `/api/portfolio/education`
- `components/skills-section.tsx` - Uses `/api/portfolio/skills`

## Admin Dashboard

Access the admin dashboard at: `/admin`

Features:
- Edit all sections (About, Experience, Education, Skills)
- Real-time data updates
- All changes are saved to `data/portfolio.json`

## Updating Your Portfolio

### Option 1: Using the Admin Dashboard (Recommended)
1. Go to `http://localhost:3000/admin`
2. Navigate to the section you want to edit
3. Update the information
4. Click the "Update" button
5. Your website will automatically reflect the changes

### Option 2: Editing JSON Directly
1. Open `/data/portfolio.json`
2. Edit the information
3. Save the file
4. Refresh your portfolio website

## Data Format

### About Section
```json
{
  "name": "Your Name",
  "title": "Your Title",
  "bio": "Short bio",
  "detailedBio": "Detailed bio",
  "additionalInfo": "Additional information",
  "email": "your@email.com",
  "phone": "+1234567890",
  "location": "Your Location",
  "image": "/path/to/image.jpg",
  "highlights": [
    {
      "icon": "GraduationCap|Briefcase|Target|Award",
      "value": "3 Years",
      "label": "Experience"
    }
  ]
}
```

### Experience Entry
```json
{
  "id": "1",
  "title": "Job Title",
  "company": "Company Name",
  "location": "Location",
  "duration": "1 Year",
  "description": ["Task 1", "Task 2"]
}
```

### Education Entry
```json
{
  "id": "1",
  "institution": "University Name",
  "program": "Program Name",
  "specialization": "Specialization",
  "period": "2023 - Present",
  "status": "Current|Completed"
}
```

### Skill Entry
```json
{
  "id": "1",
  "name": "JavaScript",
  "category": "Frontend|Backend|Database|Programming",
  "level": "Beginner|Intermediate|Advanced|Expert"
}
```

## Adding New Data

### Adding Skills via API
```bash
curl -X POST http://localhost:3000/api/portfolio/skills \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Python",
    "category": "Backend",
    "level": "Advanced"
  }'
```

### Adding Experience via API
```bash
curl -X POST http://localhost:3000/api/portfolio/experience \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Developer",
    "company": "Tech Company",
    "location": "City",
    "duration": "2 Years",
    "description": ["Task 1", "Task 2"]
  }'
```

## File Structure

```
your-portfolio/
├── data/
│   └── portfolio.json          # All portfolio data
├── lib/
│   ├── types/
│   │   └── portfolio.ts        # TypeScript types
│   └── portfolio-data.ts       # Data management utilities
├── app/
│   ├── api/
│   │   └── portfolio/
│   │       ├── about/route.ts
│   │       ├── experience/route.ts
│   │       ├── education/route.ts
│   │       └── skills/route.ts
│   └── admin/
│       └── page.tsx            # Admin dashboard
└── components/
    ├── about-section.tsx       # Dynamic component
    ├── experience-section.tsx  # Dynamic component
    ├── education-section.tsx   # Dynamic component
    └── skills-section.tsx      # Dynamic component
```

## Benefits

✅ **No Code Changes** - Update your portfolio without touching code
✅ **Real-time Updates** - Changes appear immediately
✅ **Easy Management** - Simple admin interface
✅ **Type Safe** - Full TypeScript support
✅ **Scalable** - Easy to add more sections

## Tips

- Keep your image files in the `/public` folder
- Use relative paths like `/image.jpg` for images
- Each entry needs a unique `id`
- Categories are: Frontend, Backend, Database, Programming
- Skill levels: Beginner, Intermediate, Advanced, Expert
- Icons: GraduationCap, Briefcase, Target, Award

## Troubleshooting

**Changes not showing?**
- Clear your browser cache
- Refresh the page
- Check that JSON syntax is valid

**Admin page won't load?**
- Make sure the dev server is running
- Check `/api/portfolio/about` endpoint is working

**Images not showing?**
- Ensure images are in `/public` folder
- Use correct file path in JSON

---

Built with ❤️ using Next.js + TypeScript
