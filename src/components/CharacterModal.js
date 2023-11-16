import React from "react";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import styled from "styled-components";

const StyledModal = styled(Modal)`
  && {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const ModalContent = styled(Paper)`
  && {
    padding: 20px;
    width: 80%;
    text-align: center;
    max-width: 700px;
  }
`;

const CharacterImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
`;

const LeftColumnContent = styled.div`
  margin-left: 20px;
`;

const CharacterModal = ({ character, onClose }) => {
  return (
    <StyledModal open={Boolean(character)} onClose={onClose}>
      <ModalContent>
        {character && (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5">{character.name}</Typography>
              <Divider style={{ margin: "10px 0" }} />
            </Grid>
            <Grid item xs={6}>
              <CharacterImage alt={character.name} src={character.imageUrl} />
            </Grid>
            <Grid item xs={6} style={{ textAlign: "left" }}>
              <LeftColumnContent>
                <Typography variant="h6">TV Shows:</Typography>
                <ul>
                  {character.tvShows.map((show, index) => (
                    <li key={index}>{show}</li>
                  ))}
                </ul>
                <Typography variant="h6">Video Games:</Typography>
                <ul>
                  {character.videoGames.map((game, index) => (
                    <li key={index}>{game}</li>
                  ))}
                </ul>
              </LeftColumnContent>
            </Grid>
          </Grid>
        )}
      </ModalContent>
    </StyledModal>
  );
};

export default CharacterModal;
