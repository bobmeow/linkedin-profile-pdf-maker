# LinkedIn Profile PDF Maker
## Getting Started

First, run npm install and then run the development server:

```bash
npm install
npm run dev
```

After that, you will need to close your chrome browser if you have it open and open up a new terminal window.

Run this command to open up Chrome in remote debugging mode on your Mac:

```bash
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=21222
```

You will see a line in the output that looks like this:

```bash
DevTools listening on ws://127.0.0.1:21222/devtools/browser/1f4ec3c4-28bf-4f75-8c77-0b40f0e60c92
```

Copy the last path value on the websocket URI, (`1f4ec3c4-28bf-4f75-8c77-0b40f0e60c92` for example here)

Open your browser and make sure you are logged into LinkedIn. After that, open [http://localhost:3000](http://localhost:3000) with your browser.

You will need to paste your websocket value into the `Chrome Dev Socket` field.

Then paste a full LinkedIn profile URL into the `LinkedIn URL` field.

Finally, press the `Click Me` button and watch the LinkedIn profile get scraped and view the PDF that is created.
