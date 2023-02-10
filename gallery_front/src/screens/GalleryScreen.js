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
import InputText from "../components/inputs/InputText";
import {
  categoryOptions,
  artTypeOptions,
  sortingOptions,
} from "../utilities/selectOptions";
import { sortArray } from "../utilities/sortArray";

const GalleryScreen = () => {
  const { loading, setLoading } = useContext(mainContext);
  const [showGallery, setShowGallery] = useState("Drawings");
  const [sortingState, setSortingState] = useState("Default");

  // state for/from api
  const [images, setImages] = useState([]);
  const [totalPages, setTotalPages] = useState();
  const [pageNumber, setPageNumber] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [getCategories, setCategories] = useState([{ value: "All" }]);
  const [getArtType, setArtType] = useState([{ value: "All" }]);

  useEffect(() => {
    const mapedCategories = getCategories.map((x) => x.value);
    const mapedArtTypes = getArtType.map((x) => x.value);
    const getPhotos = async () => {
      setLoading(true);
      await axios
        .get(
          `http://localhost:4000/photos?page=${pageNumber}&category=${mapedCategories}&artType=${mapedArtTypes}&search=${searchQuery}`
        )
        .then((response) => {
          console.log(response);
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
  }, [pageNumber, getCategories, getArtType, searchQuery]);

  let sortedImages = sortArray(images, sortingState);

  return (
    <div className="gallery-container">
      <div className="d-flex justify-content-between align-items-center">
        <GalleryNav setShowGallery={setShowGallery} />
        <div className="d-flex gap-3">
          <div>
            <InputText setValue={setSearchQuery} />
          </div>
          <div className="sorting">
            <label>Sort by:</label>
            <SelectInput
              label={"nolabel"}
              setValue={setSortingState}
              containerStyle={""}
              options={sortingOptions}
              isMulti={false}
            />
          </div>

          <div className="filter">
            <label>Filter by:</label>
            <SelectInput
              label={"Category"}
              containerStyle={""}
              options={[{ value: "All", label: "All" }, ...categoryOptions]}
              isMulti={true}
              setValue={setCategories}
            />
            <SelectInput
              label={"Art Type"}
              containerStyle={""}
              options={[{ value: "All", label: "All" }, ...artTypeOptions]}
              isMulti={true}
              setValue={setArtType}
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
