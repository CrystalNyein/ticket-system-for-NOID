import QRCode from 'qrcode';
import path from 'path';
import fs from 'fs';
import os from 'os';
import { createCanvas, loadImage } from 'canvas';

// Function to generate and save QR code image to a file
export const generateQRCode = async (
  eventName: string,
  eventId: string,
  ticketTypeCode: string,
  ticketCode: string,
  templatePath: string, // Path to the image template
): Promise<string> => {
  try {
    const qrCodeText = `${ticketTypeCode}${ticketCode}`;
    // Resolve the Desktop folder path
    const desktopFolder = path.join(os.homedir(), 'Desktop', 'QR Codes', eventName, ticketTypeCode);

    // Ensure the folder exists, if not, create it
    if (!fs.existsSync(desktopFolder)) {
      fs.mkdirSync(desktopFolder, { recursive: true });
    }

    // Generate the QR code file path (ticket_type_code-ticket_code.png)
    const fileName = `${qrCodeText.replace(/[^a-zA-Z0-9]/g, '_')}.png`;
    const outputPath = path.join(desktopFolder, fileName);

    // Load the template image
    const templateImage = await loadImage(templatePath);
    const canvas = createCanvas(templateImage.width, templateImage.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(templateImage, 0, 0, templateImage.width, templateImage.height);

    // Generate the QR code
    const qrCodeCanvas = createCanvas(280, 280);
    const qrSize = 280;
    await QRCode.toCanvas(qrCodeCanvas, `${eventId}:${ticketTypeCode}:${ticketCode}`, { color: { light: '#00000000' } });
    ctx.drawImage(qrCodeCanvas, canvas.width - qrSize - 155, canvas.height - qrSize - 230, qrSize, qrSize);

    // Add text below the QR code
    ctx.font = 'bold 40px Times New Roman';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'black';
    ctx.fillText(qrCodeText, canvas.width - qrSize / 2 - 155, canvas.height - 195);

    // Save the final image
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(outputPath, buffer);

    return outputPath;
  } catch (error) {
    throw new Error(`Error generating and saving QR Code: ${(error as Error).message}`);
  }
};
