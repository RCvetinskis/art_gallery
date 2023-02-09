import React, { useState, useEffect, useContext } from "react";
import { CSSTransition } from "react-transition-group";
import axios from "axios";
import GalleryNav from "../components/GalleryNav";
import Drawings from "../components/Drawings";
import Canvases from "../components/Canvases";
import binaryToImage from "../utilities/binToImg";
import Pagination from "../components/Pagination";
import mainContext from "../context/MainContext";
import LoadingBox from "../components/LoadingBox";
import SelectInput from "../components/inputs/SelectInput";
import {
  categoryOptions,
  artTypeOptions,
  sortingOptions,
} from "../utilities/selectOptions";
import { sortArray } from "../utilities/sortArray";

const GalleryScreen = () => {
  const { loading, setLoading } = useContext(mainContext);
  const [showGallery, setShowGallery] = useState("Drawings");
  const [images, setImages] = useState([]);
  const [totalPages, setTotalPages] = useState();
  const [pageNumber, setPageNumber] = useState(0);
  const [sortingState, setSortingState] = useState("Default");

  // fix default to show inintal value
  useEffect(() => {
    const getPhotos = async () => {
      setLoading(true);
      await axios
        .get(`http://localhost:4000/photos?page=${pageNumber}`)
        .then((response) => {
          const newImages = response.data.photos.map((singleData) => {
            const base64String = binaryToImage(singleData.img.data.data);
            return { ...singleData, base64String };
          });
          setTotalPages(response.data.totalPages);
          setImages(newImages);
          setLoading(false);
        })
        .catch((error) => console.log(error));
    };

    getPhotos();
  }, [pageNumber]);

  let sortedImages = sortArray(images, sortingState);

  return (
    <div className="gallery-container">
      <div className="d-flex justify-content-between align-items-center">
        <GalleryNav setShowGallery={setShowGallery} />
        <div className="d-flex gap-3">
          <div className="sorting">
            <label>Sort by:</label>
            <SelectInput
              label={"nolabel"}
              setValue={setSortingState}
              containerStyle={""}
              options={sortingOptions}
              ismulti={false}
            />
          </div>

          <div className="filter">
            <label>Filter by:</label>
            <SelectInput
              label={"Category"}
              containerStyle={""}
              options={[{ value: "All", label: "All" }, ...categoryOptions]}
              ismulti={false}
            />
            <SelectInput
              label={"Art Type"}
              containerStyle={""}
              options={[{ value: "All", label: "All" }, ...artTypeOptions]}
              ismulti={false}
            />
          </div>
        </div>

        <Pagination
          totalPages={totalPages}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
        />
      </div>

      {loading ? (
        // <div>...Loading</div>
        <LoadingBox />
      ) : (
        <>
          <div>
            <CSSTransition
              in={showGallery === "Drawings"}
              timeout={300}
              classNames="fade"
              unmountOnExit
            >
              <Drawings images={sortedImages} />
            </CSSTransition>
          </div>
          <div>
            <CSSTransition
              in={showGallery === "Canvases"}
              timeout={300}
              classNames="fade"
              unmountOnExit
            >
              <Canvases images={sortedImages} />
            </CSSTransition>
          </div>
        </>
      )}
    </div>
  );
};

export default GalleryScreen;
