import styled from "styled-components";


const Contact = () => {



  const Wrapper = styled.section`
    padding: 3rem 0 5rem 0;
    text-align: center;

    .container {
      margin-top: 6rem;

      .contact-form {
        max-width: 50rem;
        margin: auto;

        .contact-inputs {
          display: flex;
          flex-direction: column;
          gap: 3rem;

          input[type="submit"] {
            cursor: pointer;
            transition: all 0.2s;

            &:hover {
              background-color: ${({ theme }) => theme.colors.white};
              border: 1px solid ${({ theme }) => theme.colors.btn};
              color: ${({ theme }) => theme.colors.btn};
              transform: scale(0.9);
            }
          }
        }
      }
    }
  `;

  return <Wrapper>
    <h2 className="common-heading">Contact Page</h2>
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.8022650499124!2d72.46607597223846!3d23.031031369993848!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e9b9cc462b20d%3A0x8665f62dc2582893!2sTRP%20Mall%20Bopal!5e0!3m2!1sen!2sin!4v1717231087535!5m2!1sen!2sin"
      width="100%"
      height="300"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>

    <div className="container">
      <div className="contact-form">
        <form
          action="https://formspree.io/f/sdbjsafj"
          method="POST"
          className="contact-inputs">
          <input
            type="text"
            placeholder="username"
            name="username"
            required
            autoComplete="off"
          />

          <input
            type="email"
            name="Email"
            placeholder="Email"
            autoComplete="off"
            required
          />

          <textarea
            name="Message"
            cols="25"
            rows="8"
            required
            autoComplete="off"
            placeholder="Enter you message">
          </textarea>

          <input type="submit" value="send" />
        </form>
      </div>
    </div>


  </Wrapper>;
};

export default Contact;
