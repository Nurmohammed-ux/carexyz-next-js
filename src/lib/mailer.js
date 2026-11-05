import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendBookingInvoice = async (booking) => {
  const {
    _id,
    userEmail,
    userName,
    serviceName,
    duration,
    priceUnit,
    unitPrice,
    totalCost,
    currency,
    location,
    createdAt,
  } = booking;

  const invoiceNumber = `CARE-${_id.toString()}`;

  const date = new Date(createdAt).toLocaleDateString("en-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const address = [
    location.division,
    location.district,
    location.city,
    location.address,
  ]
    .filter(Boolean)
    .join(", ");

  // Escape dynamic values before inserting them into HTML.
  const escapeHtml = (value = "") =>
    String(value).replace(
      /[&<>"']/g,
      (char) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[char],
    );

  const money = (value) =>
    Number(value).toLocaleString("en-BD", {
      maximumFractionDigits: 2,
    });

  return transporter.sendMail({
    from: `"Care.xyz" <${process.env.EMAIL_USER}>`,
    to: userEmail,
    subject: `Your Care.xyz Booking Invoice - ${invoiceNumber}`,
    text: `
Hello ${userName || "Customer"},

Thank you for booking with Care.xyz.

Invoice: ${invoiceNumber}
Booking date: ${date}
Service: ${serviceName}
Duration: ${duration} ${priceUnit === "hour" ? "hour(s)" : "day(s)"}
Unit price: ${currency || "BDT"} ${money(unitPrice)}
Total cost: ${currency || "BDT"} ${money(totalCost)}
Address: ${address}
Booking status: Pending

Please keep this email for your records.

Care.xyz Team
    `,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;color:#1f2937">
        <div style="background:#16a34a;color:white;padding:24px">
          <h1 style="margin:0">Care.xyz</h1>
          <p style="margin-bottom:0">Booking Invoice</p>
        </div>

        <div style="padding:24px">
          <h2>Hello ${escapeHtml(userName || "Customer")},</h2>
          <p>Thank you for booking a care service with Care.xyz.</p>

          <p><strong>Invoice number:</strong> ${escapeHtml(invoiceNumber)}</p>
          <p><strong>Booking date:</strong> ${escapeHtml(date)}</p>

          <table style="width:100%;border-collapse:collapse">
            <tr>
              <td style="padding:12px;border-bottom:1px solid #eee">Service</td>
              <td style="padding:12px;border-bottom:1px solid #eee">${escapeHtml(serviceName)}</td>
            </tr>
            <tr>
              <td style="padding:12px;border-bottom:1px solid #eee">Duration</td>
              <td style="padding:12px;border-bottom:1px solid #eee">${duration} ${priceUnit === "hour" ? "hour(s)" : "day(s)"}</td>
            </tr>
            <tr>
              <td style="padding:12px;border-bottom:1px solid #eee">Unit price</td>
              <td style="padding:12px;border-bottom:1px solid #eee">${escapeHtml(currency || "BDT")} ${money(unitPrice)}</td>
            </tr>
            <tr>
              <td style="padding:12px;border-bottom:1px solid #eee">Address</td>
              <td style="padding:12px;border-bottom:1px solid #eee">${escapeHtml(address)}</td>
            </tr>
            <tr>
              <td style="padding:16px 12px"><strong>Total cost</strong></td>
              <td style="padding:16px 12px;color:#16a34a;font-size:20px"><strong>${escapeHtml(currency || "BDT")} ${money(totalCost)}</strong></td>
            </tr>
          </table>

          <p style="margin-top:24px">Booking status: <strong>Pending</strong></p>
          <p>Please keep this invoice for your records.</p>
          <p>Thank you,<br/>Care.xyz Team</p>
        </div>
      </div>
    `,
  });
};
