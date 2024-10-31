import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Centered Text Layout</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                background-color: #773A57;
            }
            .content {
                text-align: center;
                max-width: 600px;
                padding: 20px;
                background-color: #fff;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                border-radius: 8px;
            }
            h1 {
                color: #333;
                margin-top: 0;
            }
            p {
                color: #555;
                line-height: 1.6;
            }
        </style>
    </head>
    <body>
        <div class="content">
            <h1>Automation</h1>
            <p>Make your life easy by CI/CD</p>
        </div>
    </body>
    </html>
    `;
  }
}
