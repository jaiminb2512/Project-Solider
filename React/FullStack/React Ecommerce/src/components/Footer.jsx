import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import Button from "../styles/Button";
import { FaLinkedinIn } from "react-icons/fa";
import { SiLeetcode, SiGeeksforgeeks, SiCodingninjas,SiHackerearth,SiHackerrank ,SiCodechef } from "react-icons/si";

const Footer = () => {
  return (
    <>
      <Wrapper>
        <section className="box contact-short">
          <div className=" grid grid-two-column">
            <div>
              <h3>Ready to get started?</h3>
              <h3>Talk to us today</h3>
            </div>

            <div>
              <Button className="btn hireme-btn">
                <NavLink to="/"> Get Started </NavLink>
              </Button>
            </div>
          </div>
        </section>
        {/* footer section */}

        <footer>
          <div className="container grid grid-four-column footer-container">
            <div className="footer-about">
              <h3>  Jaimin Prajapati </h3>
            </div>
            <div className="footer-social">
              <h3>Follow Me</h3>
              <div className="footer-social--icons">
                <div>
                  <a
                    href="https://www.linkedin.com/in/jaiminb251203/"
                    target="_blank">
                    <FaLinkedinIn className="icons" />
                  </a>
                </div>
                <div>
                  <a
                    href="https://leetcode.com/u/Jaiminb2512/"
                    target="_blank">
                    <SiLeetcode className="icons" />
                  </a>
                </div>
                <div>
                  <a
                    href="https://www.geeksforgeeks.org/user/jaiminb2512/"
                    target="_blank">
                    <SiGeeksforgeeks className="icons" />
                     </a>
                </div>
                <div>
                  <a
                    href="https://www.naukri.com/code360/profile/jaiminb2003"
                    target="_blank">
                    <SiCodingninjas className="icons" />
                  </a>
                </div>
                <div>
                  <a
                    href="https://www.hackerearth.com/@jaiminprajapati251203"
                    target="_blank">
                    <SiHackerearth className="icons" />
                  </a>
                </div>
                <div>
                  <a
                    href="https://www.hackerrank.com/profile/jaiminprajapati6"
                    target="_blank">
                    <SiHackerrank className="icons" />
                  </a>
                </div>
                <div>
                  <a
                    href="https://www.codechef.com/users/jaiminb2512"
                    target="_blank">
                    <SiCodechef className="icons" />
                  </a>
                </div>
              </div>
            </div>
          </div>

        </footer>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.section`


  .iSIFGq {
    margin: 0;
  }

  .footer-container{
    display: flex;
    justify-content: center;

    p{
      width: 90%;
    }
  }

  .contact-short {
    max-width: 60vw;
    margin: auto;
    padding: 5rem 10rem;
    background-color: ${({ theme }) => theme.colors.bg};
    border-radius: 1rem;
    box-shadow: ${({ theme }) => theme.colors.shadowSupport};
    transform: translateY(50%);

    .grid div:last-child {
      justify-self: end;
      align-self: center;
    }
  }

  footer {
    padding: 14rem 0 9rem 0;
    background-color: ${({ theme }) => theme.colors.footer_bg};
    h3 {
      color: ${({ theme }) => theme.colors.hr};
      margin-bottom: 2.4rem;
    }
    p {
      color: ${({ theme }) => theme.colors.white};
    }
    .footer-social--icons {
      display: flex;
      gap: 2rem;

      div {
        padding: 1rem;

        .icons {
          color: white;
          font-size: 2.4rem;
          position: relative;
          cursor: pointer;
        }
      }
    }
  }

  .footer-bottom--section {
    padding-top: 9rem;

    hr {
      margin-bottom: 2rem;
      color: ${({ theme }) => theme.colors.hr};
      height: 0.1px;
    }
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .contact-short {
      max-width: 80vw;
      margin: 4.8rem auto;
      transform: translateY(0%);
      text-align: center;

      flex-direction: coloumn;
        justify-self: center;
      }
    }

    footer {
      padding: 9rem 0 9rem 0;
    }

    .footer-bottom--section {
      padding-top: 4.8rem;
    }
  }
`;

export default Footer;
