import React from "react";
import typeColors from "../../helpers/typeColors";
import "./style.css";
import typeColors2 from "../../helpers/typeColors2";
import Popup from "reactjs-popup";

function Card({ pokemon }) {
  return (
    <div
      className="Card"
      style={{
        backgroundColor: typeColors2[pokemon.types[0].type.name],
      }}
    >
      <div className="Card__img">
        <img src={pokemon.sprites.front_default} alt="" />
      </div>
      <div className="Card__name">{pokemon.name}</div>
      <div className="Card__types">
        {pokemon.types.map((type) => {
          return (
            <>
              <div
                className="Card__type"
                style={{ backgroundColor: typeColors[type.type.name] }}
              >
                {type.type.name}
              </div>
            </>
          );
        })}
      </div>

      <div className="Card__info">
        <div className="Card__data Card__data--weight">
          <p className="title">Weight</p>
          <p>{pokemon.weight}</p>
        </div>
        <div className="Card__data Card__data--weight">
          <p className="title">Height</p>
          <p>{pokemon.height}</p>
        </div>
        <div className="Card__data Card__data--ability">
          <p className="title">Ability</p>
          <p>{pokemon.abilities[0].ability.name}</p>
        </div>
        <div className="Card__data Card__data--ability">
          <p className="title">Base Experience</p>
          <p>{pokemon.base_experience}</p>
        </div>

        <div>
          <Popup
            trigger={<button className="btn2"> More Details </button>}
            modal
            nested
          >
            {(close) => (
              <div className="modal">
                <button className="close" onClick={close}>
                  &times;
                </button>
                <div
                  className="header"
                  style={{
                    backgroundColor: typeColors2[pokemon.types[0].type.name],
                  }}
                >
                  {" "}
                  More Detail About {pokemon.name}{" "}
                </div>
                <div className="content">
                  {" "}
                  <h5>Hp : {pokemon.stats[0].base_stat}</h5>
                  <h5>Attack : {pokemon.stats[1].base_stat}</h5>
                  <h5>Defence : {pokemon.stats[2].base_stat}</h5>{" "}
                </div>
              </div>
            )}
          </Popup>
        </div>
      </div>
    </div>
  );
}

export default Card;
