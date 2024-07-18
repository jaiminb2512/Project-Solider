import { linksData } from "../data/blog-posts";
import FooterLink from "./FooterLink";
import "../styles/Footer.scss";

const Footer = () => {
  return (
    <footer className="footer bg-blue-dark">
      <div className="container">
        <div className="ftr-list">
          <div className="ftr-item">
            <a href="#" className="ftr-brand text-white">
            Digital Diaries <span className=" bg-white"></span>
            </a>

            <p className="text text-base">
             My Profiles
            </p>
            <ul className="social-links text-white flex flex-wrap text-gray text-base">
              <li><a className="" href="https://www.linkedin.com/in/jaimin-prajapati251203" target="_blank">Linkedin</a></li>
              <li><a className="" href="https://leetcode.com/u/Jaiminb2512/"  target="_blank">LeetCode</a></li>
              <li><a className="" href="https://www.geeksforgeeks.org/user/jaiminb2512/"  target="_blank">GeeksForGeeks</a></li>
            </ul>
          </div>

          {
            linksData.map((linkData) => {
              return (
                <FooterLink key = { linkData.id } linkData = { linkData } />
              )
            })
          }
        </div>
        <div className="ftr-text text-center text-gray text-base">Project By Jaimin Prajapati</div>
      </div>
    </footer>
  )
}

export default Footer
