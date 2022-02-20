import { NextPage } from "next";
import { Container } from "../../components/atoms/Container";
import { Layout } from "../../components/templates/Layout";
import { Meta } from "../../components/templates/Meta";
import { useState, useEffect } from "react";
import firebase from "firebase";
import { useRouter } from "next/router";
import "../api/fire";

const db = firebase.firestore();
const CocktailDel: NextPage = () => {
  const [message, setMessage] = useState<string>("wait.");
  const [data, setData] = useState<any>(null);
  const router = useRouter();
  if (router.query.id != undefined && router.query.id?.length >= 1) {
    var query_id = router.query.id.toString();
  }
  useEffect(() => {
    if (router.query.id != undefined) {
      setMessage("Delete id = " + router.query.id);
      db.collection("mydata")
        .doc(query_id)
        .get()
        .then((ob) => {
          setData(ob.data());
        });
    } else {
    }
  }, [message]);

  const doAction = (e: any) => {
    db.collection("mydata")
      .doc(query_id)
      .delete()
      .then((ref) => {
        router.push("/cocktail");
      });
  };

  return (
    <Layout>
      <Meta />
      <Container>
        <div>
          <div className="alert alert-primary text-center">
            <h5 className="mb-4">{message}</h5>
            <pre className="card p-3 m-3 h5 text-left">
              カクテル名: {data != null ? data.name : "..."}
              <br />
              Mail: {data != null ? data.mail : "..."}
              <br />
              Age: {data != null ? data.age : "..."}
            </pre>
            <button onClick={doAction} className="btn btn-primary">
              Delete
            </button>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default CocktailDel;
