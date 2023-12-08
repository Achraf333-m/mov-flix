import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useRecoilState, useRecoilValue } from "recoil";
import { VideoState, modalState, movieState } from "@/atoms/atom";
import ReactPlayer from "react-player";
import { IoVolumeMuteOutline } from "react-icons/io5";
import { IoVolumeHighOutline } from "react-icons/io5";
import { FaThumbsUp } from "react-icons/fa";
import useFireAuth from "@/custom_hooks/useFireAuth";
import {
  DocumentData,
  Firestore,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { Movie } from "@/typings";
import toast, { Toaster } from "react-hot-toast";
import { Typography, duration } from "@mui/material";
import { db } from "@/firebase";

const style = {
  background: "green",
  color: "white",
  fontWeight: "bold",
  fontSize: "16px",
  padding: "16px",
  borderRadius: "9999px",
  maxWidth: "7000px",
};

export default function BasicModal() {
  const [mute, setMute] = useState(false);
  const { user } = useFireAuth();
  const [open, setOpen] = useRecoilState(modalState);
  const [Trailer, setTrailer] = useRecoilState(movieState);
  const [movie, setMovie] = useRecoilState(VideoState);
  const trailerKey = useRecoilValue(movieState);
  const [movies, setMovies] = useState<DocumentData[] | Movie[]>([]);
  const [addedToList, setAddedToList] = useState(false);
  const handleList = async () => {
    if (addedToList) {
      await deleteDoc(
        doc(db, "customers", user!.uid, "MyList", movie?.id.toString()!)
      );
      toast(
        `'${
          movie?.name ||
          movie?.original_name ||
          movie?.title ||
          movie?.original_title
        }' removed from 'Movies I Liked' list!`,
        { duration: 3000, style: style }
      );
      setAddedToList(false)
    } else {
      await setDoc(
        doc(db, "customers", user!.uid, "MyList", movie?.id.toString()!),
        { ...movie }
      );
      toast(
        `'${
          movie?.name ||
          movie?.original_name ||
          movie?.title ||
          movie?.original_title
        }' added to 'Movies I Liked' list!`,
        { duration: 3000, style: style }
      );
      setAddedToList(true)
    }
  };

  useEffect(() => {
    if (user) {
      return onSnapshot(
        collection(db, "customers", user.uid, "MyList"),
        (snapshot) => setMovies(snapshot.docs)
      );
    }
  }, [db, movie?.id]);

  useEffect(
    () =>
      setAddedToList(
        movies.findIndex((result) => result.data().id === movie?.id) !== -1
      ),
    [movies]
  );

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setTrailer("");
    setMovie(null);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        className="flex justify-center items-center"
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="rounded-md relative h-[500px] w-[800px] flex justify-center bg-green-900/60 overflow-hidden border-2 border-green-900">
          <ReactPlayer
            width="100%"
            height="100%"
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              borderRadius: "14px",
            }}
            url={`https://www.youtube.com/watch?v=${trailerKey}`}
            playing={true}
            loop={true}
            muted={mute}
          />
          <div className="absolute py-24 px-10 bottom-0 right-0 z-10 left-0">
            <div className="flex items-center justify-between">
              <div className="flex flex-col space-y-2">
                <h1 className="italic text-3xl font-extrabold text-green-600">
                  {movie?.title ||
                    movie?.name ||
                    movie?.original_title ||
                    movie?.original_name}
                </h1>
                <h3 className="font-extrabold italic text-green-300">
                  {movie?.release_date}
                </h3>
              </div>
              <div className="flex justify-end items-center space-x-8">
                {mute ? (
                  <button onClick={() => setMute(!mute)}>
                    <IoVolumeMuteOutline className="text-white text-xl outline-none border-none" />
                  </button>
                ) : (
                  <button onClick={() => setMute(!mute)}>
                    <IoVolumeHighOutline className="text-white text-xl outline-none border-none" />
                  </button>
                )}
                <button onClick={() => handleList()} className="buttonModal">
                  {addedToList ? (
                    <FaThumbsUp className=" text-green-400 h-5 w-5" />
                  ) : (
                    <FaThumbsUp className="h-5 w-5" />
                  )}
                </button>
                <Toaster />
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
