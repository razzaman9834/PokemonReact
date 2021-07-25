import React, { useState, useEffect } from "react";
import Card from "./components/Card";
import { getPokemon, getAllPokemon } from "./services/pokemon";
import "./App.css";
import axios from "axios";
import backgroundImage from "./pattern.png";
import Navbar from "./components/Navbar/Navbar";
import typeColors from "../src/helpers/typeColors";
import typeColors2 from "../src/helpers/typeColors2";

function App() {
  const [count, setCount] = useState(1);
  const [pokemonData, setPokemonData] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonChosen, setPokemonchosen] = useState(false);

  const [pokemon, setPokemon] = useState({
    name: "",
    species: "",
    img: "",
    hp: "",
    attack: "",
    defence: "",
    type: "",
    height: "",
    ability: "",
    weight: "",
    base_experience: "",
  });
  const initialURL = "https://pokeapi.co/api/v2/pokemon";

  useEffect(() => {
    async function fetchData() {
      let response = await getAllPokemon(initialURL);
      setNextUrl(response.next);
      setPrevUrl(response.previous);
      await loadPokemon(response.results);
      setLoading(false);
    }
    fetchData();
  }, []);

  const next = async () => {
    setCount(count + 1);
    setLoading(true);
    let data = await getAllPokemon(nextUrl);
    await loadPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };

  const prev = async () => {
    if (!prevUrl) return;
    setLoading(true);
    let data = await getAllPokemon(prevUrl);
    await loadPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
    setCount(count - 1);
  };

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map(async (pokemon) => {
        let pokemonRecord = await getPokemon(pokemon);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchPokemon();
  };

  const searchPokemon = () => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((response) => {
        console.log(response);
        setPokemon({
          name: pokemonName,
          species: response.data.species.name,
          img: response.data.sprites.front_default,
          hp: response.data.stats[0].base_stat,
          attack: response.data.stats[1].base_stat,
          defence: response.data.stats[2].base_stat,
          type: response.data.types[0].type.name,
          height: response.data.height,
          ability: response.data.abilities[0].ability.name,
          weight: response.data.weight,
          base_experience: response.data.base_experience,
        });
        setPokemonchosen(true);
      });
  };

  const hide = () => {
    setPokemonchosen(false);
  };

  const [bt, setbt] = useState(true);

  return (
    <>
      <Navbar />
      <div className="App1" style={{ background: `url(${backgroundImage})` }}>
        <div>
          {loading ? (
            <h1 style={{ textAlign: "center" }}>Loading...</h1>
          ) : (
            <>
              <div>
                <div className="App">
                  <div className="TitleSection">
                    <h1 className="pokhead">Pokemon Library</h1>
                    <form onSubmit={handleSubmit}>
                      <label>
                        <input
                          type="text"
                          placeholder="enter pokemon name"
                          required={true}
                          onChange={(event) => {
                            setPokemonName(event.target.value.toLowerCase());
                            let item = event.target.value;
                            if (item.length < 1) {
                              setbt(true);
                            } else {
                              setbt(false);
                            }
                          }}
                        />
                      </label>
                    </form>
                  </div>

                  <br />
                  <br />

                  <div className="DisplaySection">
                    {!pokemonChosen ? null : (
                      <>
                        {" "}
                        <div
                          className="Card"
                          style={{
                            backgroundColor: typeColors2[pokemon.type],
                          }}
                        >
                          <div className="Card__img">
                            <img src={pokemon.img} alt="" />
                          </div>
                          <div className="Card__name">{pokemon.name}</div>

                          <div className="Card__types">
                            <div
                              className="Card__type"
                              style={{
                                backgroundColor: typeColors[pokemon.type],
                              }}
                            >
                              {pokemon.type}
                            </div>
                          </div>
                          <div className="Card__info">
                            <div className="Card__data Card__data--weight">
                              <p className="title">
                                Weight : {pokemon.weight} kg
                              </p>
                            </div>
                            <div className="Card__data Card__data--weight">
                              <p className="title">
                                Height :{pokemon.height} feet
                              </p>
                            </div>
                            <div className="Card__data Card__data--ability">
                              <p className="title">
                                Ability : {pokemon.ability}
                              </p>
                            </div>
                            <div className="Card__data Card__data--ability">
                              <p className="title">
                                Base Experience : {pokemon.base_experience}
                              </p>
                            </div>
                            <div className="Card__data Card__data--ability">
                              <p className="title">Hp : {pokemon.hp}</p>
                            </div>

                            <div className="Card__data Card__data--ability">
                              <p className="title">Attack : {pokemon.attack}</p>
                            </div>

                            <div className="Card__data Card__data--ability">
                              <p className="title">
                                defence : {pokemon.defence}
                              </p>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="btn">
                <button onClick={prev}>Prev Page</button>
                <button>Page No. {count} </button>
                <button onClick={next}>Next Page</button>

                <button onClick={searchPokemon} disabled={bt}>
                  Search
                </button>

                {pokemonChosen ? <button onClick={hide}>Hide</button> : null}
              </div>

              <div className="grid-container">
                {pokemonData.map((pokemon, i) => {
                  return <Card key={i} pokemon={pokemon} />;
                })}
              </div>
              <br />

              <div className="btn">
                <button onClick={prev}>Prev Page</button>
                <button onClick={next}>Next Page</button>
              </div>

              <br />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
