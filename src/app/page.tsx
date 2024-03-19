"use client";

import "./global.css";

import styles from "./styles.module.scss";
import { useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { options } from "@/config/optionsAPI";
import { translateText } from "@/utils/translate";
import Image from "next/image";

interface User {
  name: { first: string; last: string };
  email: string;
  birthday: Date;
  address: string;
  phone: string;
  password: string;
  picture: { large: string; thumbnail: string };
  dob: { date: Date; age: string };
  location: { country: string; city: string; state: string };
}

interface Quote {
  value: string;
}

export default function Home() {
  const [users, setUsers] = useState<User>();
  const [quote, setQuote] = useState<Quote>();

  async function getUser() {
    await getQuote();
    await axios
      .get("https://randomuser.me/api/?nat=br")
      .then((response) => {
        const data = response.data;
        setUsers(data.results[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function getQuote() {
    const responseQuote = await axios.request(options);
    const quoteData = responseQuote.data;
    console.log(quoteData);
    setQuote({ value: quoteData.value });
  }

  async function getQuoteTranslated() {
    const translatedText = await translateText(quote?.value);
    setQuote({ value: translatedText.translatedText });
  }

  const birthDay = users
    ? dayjs(Object.values(users.dob)[0]).format("DD/MM/YYYY")
    : "";

  return (
    <main className={styles.main}>
      {users ? (
        <div className={styles.containerCards}>
          <div className={styles.boxInfoUser}>
            <Image
              src={users.picture ? users.picture.large : ""}
              alt="User Photo"
              width={300}
              height={300}
            />
            <h1>{users.name.first + " " + users.name.last}</h1>
            <p className={styles.age}>{users.dob.age} anos</p>
          </div>
          <div className={styles.boxQuote}>
            <p><strong>{quote?.value}</strong></p>
            <p>Chuck Norris</p>
          </div>
          <p className={styles.email}>{users.email}</p>
          <p>{birthDay}</p>
          <p>Brasil 🇧🇷</p>
        </div>
      ) : (
        ""
      )}
      <div className={styles.containerButtons}>
        <button onClick={getUser} className={styles.translateButton}>
          Random User
        </button>
        <button onClick={getQuoteTranslated} className={styles.translateButton}>
          Translate Phrase
        </button>
      </div>
    </main>
  );
}
