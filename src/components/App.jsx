import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Loader } from "./Loader/Loader";
import { Button } from "./Button/Button";
import { Modal } from "./Modal/Modal";
import { getImages } from "components/apiService";
import { AppDiv } from "./App.styled";
import { useState } from "react";
import { useEffect } from "react";


export function App() {
  const [searchInputValue, setSearchInputValue]  = useState('');
  const [foundSearch, setFoundSearch] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loadMoreButton, setLoadMoreButton] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalImgSrc, setModalImgSrc] = useState('');
  const [loader, setLoader] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  console.log("🧨setTotalPages:", setTotalPages)
  console.log("🚀totalPages:", totalPages)

  useEffect(() => {
    setLoader(true);
    try {
      const response = getImages(searchInputValue, page);
      if (response.images.length === 0) {
        alert(`These are no "${foundSearch}" images`);
        return;
      };
      if (page === 1) {
        console.log(`We found ${response.totalHits} images`);
      };
      setImages(prevState=>[...prevState, ...response.images]);
      setLoadMoreButton(page < Math.ceil(response.totalHits / 12));
    } catch (error) {
      alert(error.message);
        
    } finally {
      
      setLoader(false);
    }
    }, [searchInputValue, page,foundSearch]
  )

  const handleSearchInput = e => {
    setSearchInputValue(e.currentTarget.value.toLowerCase());
  };

  const handleSearchSubmit = e => {
    e.preventDefault();
    window.scrollTo(0,0);
    if (searchInputValue.trim() === '') {
      alert(`Search request shouldn't be empty`);
      return;
    };
    if(searchInputValue !== foundSearch) {
      setPage(1);
      setImages([]);
      setFoundSearch(searchInputValue);
      setLoadMoreButton(false);
    };
  };
  const modalOpen = e => {
    if(e.target.nodeName === 'IMG') {
      setShowModal(true);
      setModalImgSrc(e.target.getAttribute("data-modal"))
    };
  };
  const modalClose = () => {
  setShowModal(false); setModalImgSrc("")
  };
   const loadMore = () => {    
    setPage(prevState => {
      return prevState + 1;
    });
  };

    return <AppDiv>  
      <Searchbar search={searchInputValue} onChange={handleSearchInput} onSubmit={handleSearchSubmit} />
      {images.length !== 0 && (<ImageGallery images={images} modalOpen={modalOpen}/>
      )}
      {loader === true && <Loader />}
      {!loader && loadMoreButton && <Button onClick={loadMore} />}
      {showModal  && <Modal modalClose={modalClose} children={<img src={modalImgSrc} alt=''/>}/>}
      </AppDiv> 
    ;
};
