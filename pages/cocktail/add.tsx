import { NextPage } from "next";
import { Container } from "../../components/atoms/Container";
import { Layout } from "../../components/templates/Layout";
import { Meta } from "../../components/templates/Meta";
import { useState, useEffect } from "react";
import firebase from "firebase";
import { useRouter } from "next/router";
import "../api/fire";

const db = firebase.firestore();

const CocktailAdd: NextPage = () => {
  const [name, setName] = useState("");
  const [way, setWay] = useState("");
  const [glass, setGlass] = useState("");
  const [material, setMaterial] = useState<Array<string>>([]);
  const [mate, setMate] = useState("");
  const [qu, setQu] = useState("");
  const [garnish, setGarnish] = useState("なし");
  const [option, setOption] = useState("なし");
  const router = useRouter();

  const onChangeName = (e: any) => {
    setName(e.target.value);
  };
  const onChangeWay = (e: any) => {
    setWay(e.target.value);
  };
  const onChangeGlass = (e: any) => {
    setGlass(e.target.value);
  };
  const onChangeMate = (e: any) => {
    setMate(e.target.value);
  };
  const onChangeQu = (e: any) => {
    setQu(e.target.value);
  };
  const onChangeGarnish = (e: any) => {
    setGarnish(e.target.value);
  };
  const onChangeOption = (e: any) => {
    setOption(e.target.value);
  };
  const onClickAdd = (e: any) => {
    if (mate === "" || qu === "") return;
    const newMaterials = [...material, mate, qu];
    setMate("");
    setQu("");
    setMaterial(newMaterials);
  };

  const doAction = (e: any) => {
    const ob = {
      name: name,
      way: way,
      glass: glass,
      material: material,
      garnish: garnish,
      option: option,
    };
    db.collection("mydata")
      .add(ob)
      .then((ref) => {
        router.push("/cocktail");
      });
  };

  return (
    <Layout>
      <Meta />
      <Container>
        <div>
          <div className="text-left">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                カクテル名
              </label>
              <input
                className="shadow appearance-none border rounded w-[300px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                onChange={onChangeName}
                value={name}
              />
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                技法
              </label>
              <div className="relative">
                <select
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-state"
                  value={way}
                  onChange={onChangeWay}
                >
                  <option value={"シェイク"}>シェイク</option>
                  <option value={"ビルド"}>ビルド</option>
                  <option value={"ステア"}>ステア</option>
                  <option value={"?"}>?</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                グラス
              </label>
              <div className="relative">
                <select
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-state"
                  value={glass}
                  onChange={onChangeGlass}
                >
                  <option value={"カクテル"}>カクテル</option>
                  <option value={"10タン"}>10タン</option>
                  <option value={"コリンズ"}>コリンズ</option>
                  <option value={"ロック"}>ロック</option>
                  <option value={"?"}>?</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <div className="inline-block">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  材料
                </label>
                <input
                  className="shadow appearance-none border rounded w-[300px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  onChange={onChangeMate}
                  value={mate}
                />
              </div>
              <div className="inline-block">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  分量
                </label>
                <input
                  className="shadow appearance-none border rounded w-[300px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  onChange={onChangeQu}
                  value={qu}
                />
              </div>
              <button
                onClick={onClickAdd}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              >
                追加
              </button>
              {material.map((m) => (
                <li>{m}</li>
              ))}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                ガーニッシュ
              </label>
              <input
                className="shadow appearance-none border rounded w-[300px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                onChange={onChangeGarnish}
                value={garnish}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                オプション
              </label>
              <input
                className="shadow appearance-none border rounded w-[300px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                onChange={onChangeOption}
                value={option}
              />
            </div>
          </div>
          <button
            onClick={doAction}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          >
            Add
          </button>
        </div>
      </Container>
    </Layout>
  );
};

export default CocktailAdd;
