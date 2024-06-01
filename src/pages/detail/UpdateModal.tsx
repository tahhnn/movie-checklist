import MovieUpdate from "@/components/movie/MovieUpdate";
import { Box, Modal } from "@mui/material";
import React from "react";

type Props = {
  onUpdate: boolean;
  setOnUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  style3: any;
  handleSuccess: () => void;
  data: any;
};

const UpdateModal = ({
  onUpdate,
  setOnUpdate,
  style3,
  handleSuccess,
  data,
}: Props) => {
  return (
    <div>
      <Modal open={onUpdate} onClose={() => setOnUpdate(false)}>
        <Box sx={style3}>
          <MovieUpdate item={data} handleSuccess={handleSuccess} />
        </Box>
      </Modal>
    </div>
  );
};

export default UpdateModal;
