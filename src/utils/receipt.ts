import { CartLine } from "@/types/menu";

const TAX_RATE = 0.0825;

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[character] ?? character);
}

export function createReceiptHtml(lines: CartLine[], staffName: string) {
  const subtotal = lines.reduce((sum, line) => sum + line.price * line.quantity, 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;
  const orderNumber = Date.now().toString().slice(-6);
  const printedAt = new Date().toLocaleString();
  const items = lines.map((line) => `
    <tr>
      <td><strong>${line.quantity} ×</strong> ${escapeHtml(line.name)}</td>
      <td class="amount">$${(line.price * line.quantity).toFixed(2)}</td>
    </tr>
  `).join("");

  return `<!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
          @page { margin: 18px; size: 80mm auto; }
          body { color: #17201b; font-family: Arial, sans-serif; font-size: 12px; margin: 0; }
          h1 { font-size: 20px; margin: 0 0 4px; text-align: center; }
          .subtitle, .thanks { color: #66716a; text-align: center; }
          .details { border-bottom: 1px dashed #aab2ac; border-top: 1px dashed #aab2ac; margin: 16px 0; padding: 10px 0; }
          .details p { margin: 3px 0; }
          table { border-collapse: collapse; width: 100%; }
          td { padding: 6px 0; vertical-align: top; }
          .amount { text-align: right; white-space: nowrap; }
          .totals { border-top: 1px dashed #aab2ac; margin-top: 10px; padding-top: 8px; }
          .total { font-size: 16px; font-weight: bold; }
          .thanks { margin-top: 20px; }
        </style>
      </head>
      <body>
        <h1>Dave's Coffee Shop</h1>
        <div class="subtitle">Downtown · Register 01</div>
        <div class="details">
          <p>Order #${orderNumber}</p>
          <p>${escapeHtml(printedAt)}</p>
          <p>Table 12 · Dine in · 2 guests</p>
          <p>Served by ${escapeHtml(staffName)}</p>
        </div>
        <table><tbody>${items}</tbody></table>
        <table class="totals"><tbody>
          <tr><td>Subtotal</td><td class="amount">$${subtotal.toFixed(2)}</td></tr>
          <tr><td>Tax (8.25%)</td><td class="amount">$${tax.toFixed(2)}</td></tr>
          <tr class="total"><td>Total</td><td class="amount">$${total.toFixed(2)}</td></tr>
        </tbody></table>
        <div class="thanks">Thank you for visiting!</div>
      </body>
    </html>`;
}
