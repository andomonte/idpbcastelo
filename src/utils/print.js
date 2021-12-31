import print from 'print-js';

function Print() {
  if (window !== undefined) {
    print({
      printable: 'app',
      type: 'html',
      style: '.result {visibility: visible;font-size: 30px;color: green;}',
      css: 'src/style.css',
    });
  }
}
export default Print;
