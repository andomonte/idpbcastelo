const delay = require('delay');

export default function Delay(ms) {
  (async () => {
    await delay(ms);

    // Executed 100 milliseconds later
  })();
}
