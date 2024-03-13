exports.editBookingConfirmationEmail = (
  customerName, date,
  time,
  numofpeople
) => {
  return `<!DOCTYPE html>
  <html>
  
  <head>
    <meta charset="UTF-8">
    <title>Edit Booking Confirmation</title>
    <style>
      body {
        background-color: #ffffff;
        font-family: Arial, sans-serif;
        font-size: 16px;
        line-height: 1.4;
        color: #333333;
        margin: 0;
        padding: 0;
      }
  
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        text-align: center;
      }
  
      .logo {
        max-width: 200px;
        margin-bottom: 20px;
      }
  
      .message {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 20px;
      }
  
      .body {
        font-size: 16px;
        margin-bottom: 20px;
      }
  
      .support {
        font-size: 14px;
        color: #999999;
        margin-top: 20px;
      }
  
      .highlight {
        font-weight: bold;
      }
    </style>
  </head>
  
  <body>
    <div class="container">
      <a href="#"><img class="logo" src="https://res.cloudinary.com/dqclqq2jy/image/upload/v1704799159/chat_app/zi0hmoldfzlgql1l65pf.png" alt="Snackbae Logo"></a>
      <div class="message">Edit Booking Confirmation</div>
      <div class="body">
       <p>Dear ${customerName}</p>
        <p>Your booking details have been successfully updated! Here are the new details:</p>
        <ul>
          <li><strong>Date:</strong> ${date}</li>
          <li><strong>Time:</strong> ${time}</li>
          <li><strong>Number of People:</strong> ${numofpeople}</li>
        </ul>
        <p>We have updated your booking to the new date and time. If you have any further questions or need assistance, please feel free to contact us.</p>
        <p>Thank you for choosing us. We look forward to serving you!</p>
      </div>
      <div class="support">If you have any questions or need assistance, please feel free to reach out to us at <a
        href="mailto:info@example.com">info@example.com</a>. We are here to help!</div>
    </div>
  </body>
  
  </html>`;
};
