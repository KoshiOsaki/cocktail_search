import type { NextPage } from "next";
import { useState, useEffect } from "react";
import firebase from "firebase";
import "../api/fire";
import Link from "next/link";
import { CocktailCard } from "../../src/components/molecules/CocktailCard";
import { Layout } from "../../src/components/templates/Layout";
import { Meta } from "../../src/components/templates/Meta";
import { Container } from "../../src/components/atoms/Container";

const db = firebase.firestore();

const Cocktail: NextPage = () => {
  const mydata: any = [];
  const [data, setData] = useState();
  const [findName, setFindName] = useState("");
  const [findMa, setFindMa] = useState("");

  const onChangeFindName = (e: any) => setFindName(e.target.value);
  const onChangeFindMa = (e: any) => setFindMa(e.target.value);

  const onClickSearchName = () => {
    db.collection("mydata")
      .orderBy("name")
      .startAt(findName)
      .endAt(findName + "\uf8ff")
      .get()
      .then((snapshot) => {
        snapshot.forEach((document) => {
          const doc = document.data();
          mydata.push(
            <div key={document.id}>
              <CocktailCard
                id={document.id}
                image={doc.image || "/noimage.png"}
                name={doc.name}
                way={doc.way}
                glass={doc.glass}
                material={doc.material}
                garnish={doc.garnish}
                option={doc.option}
                note=""
                author="大崎"
              />
            </div>
          );
        });
        setData(mydata);
      });
  };
  const onClickSearchMa = () => {
    db.collection("mydata")
      .where("material", "array-contains", findMa)
      .get()
      .then((snapshot) => {
        snapshot.forEach((document) => {
          const doc = document.data();
          mydata.push(
            <div key={document.id}>
              <CocktailCard
                id={document.id}
                image={doc.image || "/noimage.png"}
                name={doc.name}
                way={doc.way}
                glass={doc.glass}
                material={doc.material}
                garnish={doc.garnish}
                option={doc.option}
                note=""
                author="大崎"
              />
            </div>
          );
        });
        setData(mydata);
      });
  };

  useEffect(() => {
    db.collection("mydata")
      .get()
      .then((snapshot) => {
        snapshot.forEach((document) => {
          const doc = document.data();

          var material = doc.material.toString();
          var material = material.replace(/,/g, " ");

          mydata.push(
            <div key={document.id}>
              <CocktailCard
                id={document.id}
                image={doc.image || "/noimage.png"}
                name={doc.name}
                way={doc.way}
                glass={doc.glass}
                material={material}
                garnish={doc.garnish}
                option={doc.option}
                note=""
                author="大崎"
              />
            </div>
          );
        });
        setData(mydata);
      });
  }, []);

  return (
    <Layout>
      <Meta />
      <Container>
        <div className="mb-10 text-center h-[40px] w-[400px] mx-auto inline-block mt-10 mr-6">
          <label>カクテル名検索(前方一致)</label>
          <input
            onChange={onChangeFindName}
            className="shadow-md rounded-tl-lg rounded-bl-lg py-2 px-6 text-gray-700 leading-tight focus:outline-none w-[340px] h-[40px]"
            placeholder="カクテル名を入力してね"
          />
          <button
            type="submit"
            onClick={onClickSearchName}
            className={`shadow-md rounded-tr-lg rounded-br-lg float-right bg-blue-500 hover:bg-blue-700 text-white w-[60px] h-[40px]`}
          >
            <svg
              className="fill-current py-1 px-1 m-auto"
              viewBox="0 0 56.966 56.966"
              width="23px"
              height="23px"
            >
              <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
            </svg>
          </button>
        </div>
        <div className="mb-10 text-center h-[40px] w-[400px] mx-auto inline-block mt-10 sm:mt-3 mr-6">
          <label>材料名検索(完全一致)</label>
          <input
            onChange={onChangeFindMa}
            className="shadow-md rounded-tl-lg rounded-bl-lg py-2 px-6 text-gray-700 leading-tight focus:outline-none w-[340px] h-[40px]"
            placeholder="材料名を入力してね"
          />
          <button
            type="submit"
            onClick={onClickSearchMa}
            className={`shadow-md rounded-tr-lg rounded-br-lg float-right bg-blue-500 hover:bg-blue-700 text-white w-[60px] h-[40px]`}
          >
            <svg
              className="fill-current py-1 px-1 m-auto"
              viewBox="0 0 56.966 56.966"
              width="23px"
              height="23px"
            >
              <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
            </svg>
          </button>
        </div>
        <div className="inline-block my-3">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            <Link href="/cocktail/add">
              <a>カクテル追加ページへ</a>
            </Link>
          </button>
          <Link href="/cocktail/explain">
            <a className="ml-10 align-bottom underline my-3">サイト説明</a>
          </Link>
        </div>

        <div className="grid grid-cols-3 sm:block">{data}</div>
      </Container>
    </Layout>
  );
};

export default Cocktail;
