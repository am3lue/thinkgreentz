export default defineEventHandler(async (event) => {
  await requireAuth(event)
  const db = useDb()

  const galleryData = [
    { "image": "/images/back-together-after-the-holidays-with-the-alpha-high-school-eco-club.gif", "alt": "Back together after the holidays with the Alpha High School Eco Club 🌿" },
    { "image": "/images/afforestation.png", "alt": "Afforestation Project" },
    { "image": "/images/award.png", "alt": "Think Green Award" },
    { "image": "/images/community.png", "alt": "Community Activity" },
    { "image": "/images/Festival-pic.png", "alt": "Festival Event" },
    { "image": "/images/ilakiza-picture.png", "alt": "Ilakiza Team" },
    { "image": "/images/ilakiza-preparing-to-plant.png", "alt": "Preparing to Plant" },
    { "image": "/images/picking-alongshore.png", "alt": "Picking Along Shore" },
    { "image": "/images/plastic.png", "alt": "Plastic Awareness" },
    { "image": "/images/students-picking-in-yellow.png", "alt": "Students Picking in Yellow" },
    { "image": "/images/sun.png", "alt": "Sun Horizon" },
    { "image": "/images/2026-leaders.gif", "alt": "2026 Think Green Tz Leaders" }
  ];

  const blogData = [
    {
      "image": "/images/valentine -poster.png",
      "title": "Green Valentine: Love the Planet This February",
      "info": "This Valentine's Day, let's celebrate love in its purest form — love for our environment. At Think Green Tanzania, we believe that caring for our planet is the greatest act of love. From planting trees together to reducing waste, every eco-friendly gesture is a gift to Mother Earth. Join us in spreading green love this February and throughout the year.",
      "links": [ { "text": "Read Full Article", "url": "https://drive.google.com/file/d/1TFDR9fB5uq1N3TGMihN56_NugdqD1CUU/view" }, { "text": "Share", "url": "https://drive.google.com/file/d/1TFDR9fB5uq1N3TGMihN56_NugdqD1CUU/view" } ]
    },
    {
      "image": "/images/back-together-after-the-holidays-with-the-alpha-high-school-eco-club.gif",
      "title": "Back together after the holidays with the Alpha High School Eco Club 🌿",
      "info": "This first session back was filled with energy, honest conversations, and a shared commitment to the environment. Seeing students return motivated, ready to learn, and eager to take action reminded us that real change starts with consistency and community. As we reconnect, plan ahead, and set intentions for the year, we’re stepping into a season of stronger environmental awareness, conservation efforts, and meaningful stewardship driven by passionate young leaders shaping a greener future",
      "links": [ { "text": "Read Full Article", "url": "#" }, { "text": "Share", "url": "#" } ]
    },
    {
      "image": "/images/2026-leaders.gif",
      "title": "The Election of new Think green Tz Lead",
      "info": "Welcoming of the new Think green Tz Leaders who will be leading the organization to greater heights in environmental conservation and sustainability efforts across Tanzania.",
      "links": [ { "text": "Read Full Article", "url": "#" }, { "text": "Share", "url": "#" } ]
    },
    {
      "image": "/images/plastic.png",
      "title": "Youth and Environmental Action",
      "info": "Young people are leading the charge in environmental conservation. Discover how youth organizations across Tanzania are mobilizing communities and driving systemic change for a sustainable future.",
      "links": [ { "text": "Read Full Article", "url": "#" }, { "text": "Share", "url": "#" } ]
    },
    {
      "image": "/images/sun.png",
      "title": "Conservation Success Stories",
      "info": "Meet the communities and organizations making real changes. From protecting wildlife habitats to reforestation projects, these inspiring stories show how collective action can restore our environment.",
      "links": [ { "text": "Read Full Article", "url": "#" }, { "text": "Share", "url": "#" } ]
    },
    {
      "image": "/images/award.png",
      "title": "Sustainable Living: Small Steps, Big Impact",
      "info": "Making a difference doesn't require drastic changes. From reducing plastic use to supporting local farmers, discover simple ways to live sustainably and contribute to a greener Tanzania.",
      "links": [ { "text": "Read Full Article", "url": "#" }, { "text": "Share", "url": "#" } ]
    },
    {
      "image": "/images/afforestation.png",
      "title": "Understanding Climate Change in Tanzania",
      "info": "Climate change is one of the most pressing issues facing our planet today. In Tanzania, rising temperatures and unpredictable rainfall patterns are affecting agriculture and our ecosystems. Learn more about the impact and what we can do to help.",
      "links": [ { "text": "Read Full Article", "url": "#" }, { "text": "Share", "url": "#" } ]
    }
  ];

  const programsData = [
    { "image": "/images/afforestation.png", "title": "Green Saturdays", "info": "Our flagship weekly initiative where volunteers gather to plant trees and restore urban green spaces in Dar es Salaam." },
    { "image": "/images/plastic.png", "title": "Think Green Labs", "info": "Empowering youth to innovate circular economy solutions, turning plastic waste into valuable community resources." },
    { "image": "/images/ilakiza-picture.png", "title": "Beach Cleaning Activity", "info": "Activity aimed on protecting water bodies and its components from being damages by human waste." },
    { "image": "/images/sun.png", "title": "Water & Soil Care", "info": "Initiatives focused on conserving water resources and improving soil health." },
    { "image": "/images/award.png", "title": "Clean Energy Literacy", "info": "Educational campaigns to promote the use of clean and renewable energy sources." },
    { "image": "/images/Festival-pic.png", "title": "Circular Clinics", "info": "Workshops and events that promote the principles of a circular economy." },
    { "image": "/images/2026-leaders.gif", "title": "Eco-Leaders Rise", "info": "A comprehensive leadership program for students to spearhead environmental clubs in their own schools." }
  ];

  try {
    // Clear existing data so we don't duplicate on multiple clicks
    await db.execute('DELETE FROM gallery')
    await db.execute('DELETE FROM blog')
    await db.execute('DELETE FROM programs')

    // Insert gallery data
    for (let i = 0; i < galleryData.length; i++) {
      const item = galleryData[galleryData.length - 1 - i];
      await db.execute({
        sql: 'INSERT INTO gallery (image, alt, sort_order) VALUES (?, ?, ?)',
        args: [item.image, item.alt, i]
      })
    }

    // Insert blog data
    for (let i = 0; i < blogData.length; i++) {
      const item = blogData[blogData.length - 1 - i];
      const linkText = item.links && item.links.length > 0 ? item.links[0].text : null
      const linkUrl = item.links && item.links.length > 0 ? item.links[0].url : null
      await db.execute({
        sql: 'INSERT INTO blog (image, title, info, link_text, link_url, sort_order) VALUES (?, ?, ?, ?, ?, ?)',
        args: [item.image, item.title, item.info, linkText, linkUrl, i]
      })
    }

    // Insert programs data
    for (let i = 0; i < programsData.length; i++) {
      const item = programsData[i];
      await db.execute({
        sql: 'INSERT INTO programs (image, title, info, sort_order) VALUES (?, ?, ?, ?)',
        args: [item.image, item.title, item.info, i]
      })
    }

    return { success: true, message: 'Database successfully seeded with the original images and posts!' }
  } catch (e: any) {
    return createError({ statusCode: 500, message: e.message })
  }
})
