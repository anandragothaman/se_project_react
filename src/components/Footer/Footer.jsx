import "./Footer.css";
function Footer() {
  return (
    <div className="footer">
      <p className="footer__author">Developed by Anand Ragothaman</p>
      <p className="footer__copyright">{new Date().getFullYear()}</p>
    </div>
  );
}
export default Footer;
