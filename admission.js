const admissionForm = document.getElementById("collegeAdmissionForm");

admissionForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("studentName").value.trim();
  const phone = document.getElementById("studentPhone").value.trim();
  const course = document.getElementById("studentCourse").value;
  const qualification = document
    .getElementById("studentQualification").value.trim();
  const query = document.getElementById("studentMessage").value.trim();

  if (!/^[6-9]\d{9}$/.test(phone)) {
    alert("Please enter a valid 10-digit mobile number.");
    return;
  }

  // Replace with your college's WhatsApp number.
  // Include country code 91, without + or spaces.
  const collegeWhatsApp = "919119859999";

  if (!/^91\d{10}$/.test(collegeWhatsApp)) {
    alert("Please add the college WhatsApp number in admission.js.");
    return;
  }

  const message = `
*College Admission Enquiry*

Student Name: ${name}
Mobile Number: ${phone}
Interested Course: ${course}
Last Qualification: ${qualification || "Not provided"}
Query: ${query || "No additional query"}

Please share the admission details.
  `.trim();

  const whatsappURL =
    `https://wa.me/${collegeWhatsApp}?text=${encodeURIComponent(message)}`;

  window.open(whatsappURL, "_blank", "noopener,noreferrer");
});


// here contact Section form is submitted to whatsapp number of college.

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Replace with your actual college WhatsApp number.
    // Include country code 91, without + or spaces.
    const collegeWhatsApp = "919119859999";

    const name = document.getElementById("contactName").value.trim();
    const phone = document.getElementById("contactPhone").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const subject = document.getElementById("contactSubject").value;
    const message = document.getElementById("contactMessage").value.trim();

    if (!/^[0-9]{10}$/.test(phone)) {
        alert("Please enter a valid 10-digit phone number.");
        return;
    }

    const whatsappMessage =
`Hello College Team,

I want to make an enquiry.

Name: ${name}
Phone: ${phone}
Email: ${email || "Not provided"}
Enquiry Type: ${subject}

Message:
${message}`;

    const whatsappURL =
        `https://wa.me/${collegeWhatsApp}?text=${encodeURIComponent(whatsappMessage)}`;

    window.open(whatsappURL, "_blank", "noopener,noreferrer");
});
