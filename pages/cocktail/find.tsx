import { NextPage } from "next";
import { Container } from "../../components/atoms/Container";
import { Layout } from "../../components/templates/Layout";
import { Meta } from "../../components/templates/Meta";
import { useState, useEffect } from "react";
import firebase from "firebase";
import "../api/fire";
import { CocktailCard } from "../../components/molecules/CocktailCard";

const db = firebase.firestore();

const CocktailFind: NextPage = () => {
  const [find, setFind] = useState("");
  const [data, setData] = useState([]);
  const mydata: any = [];

  const onChangeFind = (e: any) => {
    setFind(e.target.value);
  };

  const doAction = (e: any) => {

    
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
  return (
    <Layout>
      <Meta />
      <Container>
        <div>
          <div className="alert alert-primary text-center">
            <div className="text-left">
              <div className="form-group">
                <label>Find:</label>
                <input
                  type="text"
                  onChange={onChangeFind}
                  className="form-control"
                />
              </div>
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={doAction}
            >
              Find
            </button>
          </div>
          <div className="grid grid-cols-3">{data}</div>
        </div>
      </Container>
    </Layout>
  );
};

export default CocktailFind;
