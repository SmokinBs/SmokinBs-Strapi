const styles = `
    <style type="text/css">
      @media only screen and (max-width: 600px) {
      			.invoice-box table tr.top table td {
      				width: 100%;
      				display: block;
      				text-align: center;
      			}
      			.invoice-box table tr.information table td {
      				width: 100%;
      				display: block;
      				text-align: center;
      			}
      		}
    </style>
`;
module.exports = {
  async afterCreate(event) {
    const { result } = event;
    try {
      const itemsOutput = result.OrderContents.map((item, i) => {
        if (!item.name) return;
        if (i === result.OrderContents.length) {
          return `
				<tr class="item last">
					<td style="padding: 5px;vertical-align: top;">${item.name.replace("-", "")}</td>
					<td style="padding: 5px;vertical-align: top;">${item.count}</td>
					<td style="padding: 5px;vertical-align: top;">$${item.total}</td>
				</tr>
			`;
        }
        return `
			<tr class="item">
				<td style="padding: 5px;vertical-align: top;">${item.name.replace("-", "")}</td>
				<td style="padding: 5px;vertical-align: top;">${item.count}</td>
				<td style="padding: 5px;vertical-align: top;">$${item.total}</td>
			</tr>
		`;
      }).join("");
      const invoiceHtml =
        styles +
        ` <body style="font-family:'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;text-align:center;color:#777;font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;text-align: center;color: #777;">
    <div class="invoice-box" style="max-width:800px;margin:auto;padding:30px;border:0px solid #eee;box-shadow:0 0 10px rgba(0, 0, 0, 0.15);font-size:16px;line-height:24px;max-width: 800px;margin: auto;padding: 30px;border: 0px solid #eee;box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);font-size: 16px;line-height: 24px;">
      <table style="width:100%;line-height:inherit;text-align:left;border-collapse:collapse;width: 100%;line-height: inherit;text-align: left;border-collapse: collapse;">
        <tr class="top">
          <td colspan="2" style="padding:5px;vertical-align:top;padding: 5px;vertical-align: top;">
            <table style="width:100%;line-height:inherit;text-align:left;border-collapse:collapse;">
              <tr>
                <td class="title" style="padding:5px;vertical-align:top;padding-bottom:20px;font-size:45px;line-height:45px;color:#333;padding: 5px;vertical-align: top;">
                  <img src="https://smokinbsbbq.tk/img/images/profile.jpg" alt="Company logo" style="width: 100%; max-width: 300px;border-radius: 50%"/>
								</td>
                <td style="padding:5px;vertical-align:top;text-align:right;padding-bottom:20px;padding: 5px;vertical-align: top;">
                  Invoice #: ${result.Customer.invoice_prefix}<br/>
									Created: ${new Date(result?.Customer?.created * 1000).toLocaleDateString()}<br/>
								</td>
              </tr>
            </table>
          </td>
        </tr>
        <tr class="information">
          <td colspan="2" style="padding:5px;vertical-align:top;padding: 5px;vertical-align: top;">
            <table style="width:100%;line-height:inherit;text-align:left;border-collapse:collapse;">
              <tr>
                <td style="padding:5px;vertical-align:top;padding-bottom:40px;padding: 5px;vertical-align: top;">
                  Smokin Bs BBQ<br/>
									4904 Clover Avenue<br/>
									Odessa, TX 79762
								</td>
                <td style="padding:5px;vertical-align:top;text-align:right;padding-bottom:40px;padding: 5px;vertical-align: top;">
                  Nick Brown<br/>
									nbrown6911@gmail.com
								</td>
              </tr>
            </table>
          </td>
        </tr>
        <tr class="heading">
          <td style="padding:5px;vertical-align:top;background:#eee;border-bottom:1px solid #ddd;font-weight:bold;padding: 5px;vertical-align: top;">Payment Method</td>
          <td style="padding:5px;vertical-align:top;text-align:right;background:#eee;border-bottom:1px solid #ddd;font-weight:bold;padding: 5px;vertical-align: top;"></td>
          <td style="padding:5px;vertical-align:top;background:#eee;border-bottom:1px solid #ddd;font-weight:bold;padding: 5px;vertical-align: top;"></td>
        </tr>
        <tr class="details">
          <td style="padding:5px;vertical-align:top;padding-bottom:20px;padding: 5px;vertical-align: top;">Card</td>
          <td style="padding:5px;vertical-align:top;text-align:right;padding-bottom:20px;padding: 5px;vertical-align: top;"></td>
          <td style="padding:5px;vertical-align:top;padding-bottom:20px;padding: 5px;vertical-align: top;"></td>
        </tr>
        <tr class="heading">
          <td style="padding:5px;vertical-align:top;background:#eee;border-bottom:1px solid #ddd;font-weight:bold;padding: 5px;vertical-align: top;">Item</td>
          <td style="padding:5px;vertical-align:top;text-align:right;background:#eee;border-bottom:1px solid #ddd;font-weight:bold;padding: 5px;vertical-align: top;">Quantity</td>
          <td style="padding:5px;vertical-align:top;background:#eee;border-bottom:1px solid #ddd;font-weight:bold;padding: 5px;vertical-align: top;">Price</td>
        </tr>
        ${itemsOutput}
				
        <tr class="total">
          <td style="padding:5px;vertical-align:top;padding: 5px;vertical-align: top;"></td>
          <td style="padding:5px;vertical-align:top;text-align:right;border-top:2px solid #eee;font-weight:bold;padding: 5px;vertical-align: top;"></td>
          <td style="padding:5px;vertical-align:top;padding: 5px;vertical-align: top;">Total: \$${
            result?.TotalPrice
          }</td>
        </tr>
      </table>
    </div>
  </body>`;

      await strapi.plugins["email"].services.email.send({
        to: result.Customer.email,
        from: "smokinbsinvoice@gmail.com",
        subject: "Your Recent Order",
        html: invoiceHtml,
      });
    } catch (err) {
      console.log(err);
    }
  },

  async afterDelete(event) {
    const { result } = event;

    console.log(result);
  },
};
