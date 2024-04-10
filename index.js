import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';

// Use the inquirer npm package to get user input.
inquirer
  .prompt([
    {
      name: 'URL',
      message: 'Enter the URL you would like to generate a QR code for: ',
      type: 'input'
    }
  ])
  .then(function (answer) {
    console.log(answer);

    const url = answer.URL

    // Use the qr-image npm package to turn the user entered URL into a QR code image.
    var qr_img = qr.image(url, { type: 'png' }); 
    qr_img.pipe(fs.createWriteStream("qr_img.png"));
    console.log("Created QR code PNG file");

    // Create a txt file to save the user input using the native fs node module.
    fs.writeFile("URL.txt", url, (error) => {
        if (error) {
            console.error('Error occurred while writing URL to file:', error);
        }
        console.log("Wrote URL to file");
    });
  })
  .catch(function (error) {
    console.error('Error occurred while prompting:', error);
  });