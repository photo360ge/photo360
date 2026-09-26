const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const isEnglish = document.documentElement.lang === 'en';
    const labels = isEnglish
      ? {
          intro: 'New Photo360.ge inquiry',
          from_name: 'Name',
          company: 'Company',
          email: 'Email',
          phone: 'Phone',
          website: 'Website',
          product_count: 'Number of products',
          message: 'Message',
        }
      : {
          intro: 'ახალი შეტყობინება Photo360.ge-სთვის',
          from_name: 'სახელი',
          company: 'კომპანია',
          email: 'ელ. ფოსტა',
          phone: 'ტელეფონი',
          website: 'ვებგვერდი',
          product_count: 'პროდუქტების რაოდენობა',
          message: 'შეტყობინება',
        };
    const fields = ['from_name', 'company', 'email', 'phone', 'website', 'product_count', 'message'];
    const message = [labels.intro]
      .concat(fields.map((field) => {
        const value = formData.get(field)?.toString().trim();
        return value ? `${labels[field]}: ${value}` : '';
      }))
      .filter(Boolean)
      .join('\n');
    const whatsappUrl = `https://wa.me/995599744774?text=${encodeURIComponent(message)}`;

    window.location.href = whatsappUrl;
  });
}