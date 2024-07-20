import Image from "next/image";
import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <div>
    <div className={styles.container}>
      <div className={styles.item}>
        <Image src="/img/bg.png" objectFit="cover" layout="fill" alt="" />
      </div>
      <div className={styles.item}>
        <div className={styles.card}>
          <h2 className={styles.motto}>
            OH YES, WE DID. THE LAMA PIZZA, WELL BAKED SLICE OF PIZZA.
          </h2>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>FIND OUR RESTAURANTS</h1>
          <p className={styles.text}>
            123 MG Road #304.
            <br /> Bengaluru, 560001
            <br /> (080) 1234-5678
          </p>
          <p className={styles.text}>
            456 Linking Road #235.
            <br /> Mumbai, 400050
            <br /> (022) 2345-6789
          </p>
          <p className={styles.text}>
            789 Anna Salai #104.
            <br /> Chennai, 600002
            <br /> (044) 3456-7890
          </p>
          <p className={styles.text}>
            101 Park Street #125.
            <br /> Kolkata, 700016
            <br /> (033) 4567-8901
          </p>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>WORKING HOURS</h1>
          <p className={styles.text}>
            MONDAY UNTIL FRIDAY
            <br /> 9:00 – 22:00
          </p>
          <p className={styles.text}>
            SATURDAY - SUNDAY
            <br /> 12:00 – 24:00
          </p>
        </div>
      </div>
    </div>
      
      <div className="thanks" style={{background: "black", color: "white"}}>
        <div>THANKS TO LAMA DEV</div>
        </div>
      </div>
  );
};

export default Footer;
