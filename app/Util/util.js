const nodemailer = require('nodemailer');

class Util {

    constructor() {}

    //send email to registered supplier (password)
    async sendPasswordForSupplier(email, password){
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: 'xunitlabs@gmail.com', // generated ethereal user
              pass: 'Infor#2020', // generated ethereal password
            },
          });
      
          //Send email with the message
          let info = await transporter.sendMail({
            from: '"Procurement System" <xunitlabs@gmail.com>', // sender address
            to: email, // list of receivers
            subject: 'User this password for login', // Subject line
            text:
              'Please Enter Bellow Code as Your account password', // plain text body
            html: `<h3 style="text-align: center">Please enter this *** ${password} *** as your password, to login to your account</h3>`, // html body
          });
      
          console.log('Message sent: %s', info.messageId);
          // Preview only available when sending through an Ethereal account
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }

  //send email to registered supplier (password)
  async sendPasswordForNewUser(email, password){
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'xunitlabs@gmail.com', // generated ethereal user
          pass: 'Infor#2020', // generated ethereal password
        },
      });
  
      //Send email with the message
      let info = await transporter.sendMail({
        from: '"Procurement System" <xunitlabs@gmail.com>', // sender address
        to: email, // list of receivers
        subject: 'Use this password for login', // Subject line
        text:
          'Please Enter Bellow Code as Your account password', // plain text body
        html: `<h3 style="text-align: center">Please enter this *** ${password} *** as your password, to login to your account</h3>`, // html body
      });
  
      console.log('Message sent: %s', info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
}  

    //send purchase order email
  async sendPurchaseOrderEmail(supplierEmail, orderItems, orderDate) {
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'xunitlabs@gmail.com', // generated ethereal user
        pass: 'Infor#2020', // generated ethereal password
      },
    });

    let info = await transporter.sendMail({
      from: '"Procurement System" <xunitlabs@gmail.com>', // sender address
      to: supplierEmail, // list of receivers
      subject: 'Please make sure to deliver bellow items', // Subject line
      html: `
        <div>
        <p>Our construction site is running out of bellow items, please make sure to deliver them before <b> ${orderDate} </b></p>
            <table style="font-family: arial, sans-serif; border-collapse: collapse; width: 70%;">
                <tr>
                    <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Item</th>
                      <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Quantity</th>
                  </tr>
                  
                    ${orderItems.map(item => {
                      return `<tr><td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${item.name}</td><td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${item.quantity}</td></tr>`;
                    })}
                  
              </table>
          </div>
      `, // html body
    });

    console.log('Message sent: %s', info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  }

}

var UtilObj = new Util();
module.exports = UtilObj;