import React from "react";

const CanvasIntro = ({ bgPhoto }) => {
  return (
    <div className="canvas-container flex-row-reverse">
      <div className="canvas-info">
        <h1>Canvas</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque
          beatae dolorem sapiente officia ullam porro placeat. Eos ratione
          soluta expedita dolor animi totam facilis, autem quod mollitia
          asperiores iusto dignissimos ex dolorem blanditiis non, quae nostrum
          sint natus deserunt ipsam. Laborum consectetur necessitatibus,
          voluptate fugiat quia rerum ex illo atque illum accusantium ut odio,
          voluptatibus culpa pariatur, iure officia laboriosam! Alias amet nihil
          autem sapiente ab ullam, repellat exercitationem rerum minus harum
          voluptatem quibusdam commodi unde, perspiciatis nisi accusamus velit
          architecto similique quisquam excepturi impedit suscipit. Ipsam, qui
          minus? Quaerat, nulla! Est eligendi, nemo nostrum nam voluptas
          nesciunt repellendus voluptatum.
        </p>
      </div>
      <div
        className="photo-bg"
        style={{ backgroundImage: `url(${bgPhoto.photo}) ` }}
      ></div>
    </div>
  );
};

export default CanvasIntro;
