import type { NextPage } from "next";


import { useState, useEffect } from "react";
import firebase from "firebase";
import "../api/fire";
import Link from "next/link";
import { CocktailCard } from "../../src/components/molecules/CocktailCard";
import { Layout } from "../../src/components/templates/Layout";
import { Meta } from "../../src/components/templates/Meta";

const db = firebase.firestore();

const Cocktail: NextPage = () => {
  const mydata: any = [];
  const [data, setData] = useState();
  const [find, setFind] = useState("");

  const onChangeFind = (e: any) => setFind(e.target.value);
  const onClickSearch = () => {
    db.collection("mydata")
    .where("material", "array-contains", find)
    .get()
    .then((snapshot) => {
      snapshot.forEach((document) => {
        const doc = document.data();
        mydata.push(
          <CocktailCard
            name={doc.name}
            way={doc.way}
            glass={doc.glass}
            material={doc.material}
            garnish={doc.garnish}
            option={doc.option}
            note=""
            author="大崎"
          />
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
          
          var material=doc.material.toString()
          var material=material.replace(/,/g," ")
          
          
          mydata.push(
            <CocktailCard
              name={doc.name}
              way={doc.way}
              glass={doc.glass}
              material={material}
              garnish={doc.garnish}
              option={doc.option}
              note=""
              author="大崎"
            />
          );
        });
        setData(mydata);
      });
  }, []);

  return (
    <Layout>
      <Meta />
      {/* <Container> */}
        <div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            <Link href="/cocktail/add">
              <a>追加ページへ</a>
            </Link>
          </button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            <Link href="/cocktail/del">
              <a>削除ページへ</a>
            </Link>
          </button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            <Link href="/cocktail/find">
              <a>検索ページへ</a>
            </Link>
          </button>
        </div>
        <div className="mb-10 text-center h-[40px] w-[400px] mx-auto">
      <input
        onChange={onChangeFind}
        className="shadow-md rounded-tl-lg rounded-bl-lg py-2 px-6 text-gray-700 leading-tight focus:outline-none w-[340px] h-[40px]"
      />
      <button
        type="submit"
        onClick={onClickSearch}
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

        <div className="grid grid-cols-3">{data}</div>
        {console.log(data)}
      {/* </Container> */}
    </Layout>
  );
};

export default Cocktail;
