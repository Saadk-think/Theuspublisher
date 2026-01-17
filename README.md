TheUSpublisher - Landing Website

Preview locally:
1) In this folder, run:
   python3 -m http.server 8080
2) Open:
   http://localhost:8080

Deploy on Vercel (includes contact form backend):
1) Create a new Vercel project from this folder
2) Add Environment Variables:
   SMTP_HOST
   SMTP_PORT
   SMTP_USER
   SMTP_PASS
   TO_EMAIL
   Optional: FROM_EMAIL
3) Deploy

Deploy on shared hosting (static only):
- Upload index.html and the assets/ folder
- The contact form will not send emails unless you implement a backend on your host

Customize:
- Edit business name, phone, email, and service packages inside index.html
- Swap images in assets/img/
