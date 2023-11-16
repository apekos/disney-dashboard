import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDisneyCharacters } from "../utils/api";
import {
  Alert,
  Button,
  Stack,
  Backdrop,
  Grid,
  TextField,
  CircularProgress,
  Typography,
} from "@mui/material";
import styled from "styled-components";
import {
  fetchCharactersSuccess,
  fetchCharactersFailure,
} from "../actions/characters";
import CharacterModal from "../components/CharacterModal";
import PieChart from "../components/PieChart";
import DataTable from "../components/DataTable";
import ExcelExport from "../components/ExcelExport";

const StyledContainer = styled.div`
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledHeader = styled.h2`
  margin-bottom: 50px;
`;

const StyledSearchContainer = styled.div`
  display: flex;
  gap: 50px;
  margin-bottom: 80px;
`;

const StyledTextField = styled(TextField)`
  && {
    width: 300px;
  }
`;

const StyledNoResultsMessage = styled(Typography)`
  color: #333;
  margin-bottom: 10px;
`;

const DisneyPage = () => {
  const dispatch = useDispatch();
  const { characters, error } = useSelector((state) => state.characters);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [searchTerm, setSearchTerm] = useState("");
  const [tvShowSearchTerm, setTvShowSearchTerm] = useState("");
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [sortDirection, setSortDirection] = useState("asc");
  const [sortField, setSortField] = useState("name");
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const handleRowClick = (character) => {
    setSelectedCharacter(character);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedCharacter(null);
    setOpenModal(false);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetchDisneyCharacters(page + 1, rowsPerPage);
      dispatch(fetchCharactersSuccess(response.data));
      setTotalPages(response.info.totalPages);
    } catch (error) {
      dispatch(
        fetchCharactersFailure(
          "Error fetching Disney characters. Please try again."
        )
      );
      setFilteredCharacters([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch, page, rowsPerPage]);

  useEffect(() => {
    const filtered = characters.filter((character) =>
      character.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (tvShowSearchTerm) {
      const filteredByTvShow = filtered.filter((character) =>
        character.tvShows.some((tvShow) =>
          tvShow.toLowerCase().includes(tvShowSearchTerm.toLowerCase())
        )
      );
      setFilteredCharacters(filteredByTvShow);
    } else {
      setFilteredCharacters(filtered);
    }
  }, [characters, searchTerm, tvShowSearchTerm]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setSearchTerm("");
    setTvShowSearchTerm("");
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    setSearchTerm("");
    setTvShowSearchTerm("");
  };

  const handleNameSearch = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleTvShowSearch = (event) => {
    setTvShowSearchTerm(event.target.value);
    setPage(0);
  };

  const handleSort = (field) => {
    setSortField(field);
    setSortDirection((prevDirection) =>
      prevDirection === "asc" ? "desc" : "asc"
    );
  };

  const handleRefresh = () => {
    fetchData();
  };

  return (
    <StyledContainer>
      {error && (
        <Stack sx={{ width: "50%" }}>
          <Alert severity="error">{error}</Alert>
        </Stack>
      )}
      <StyledHeader>Disney Characters</StyledHeader>
      <StyledSearchContainer>
        <StyledTextField
          label="Search Character"
          variant="outlined"
          value={searchTerm}
          onChange={handleNameSearch}
        />
        <StyledTextField
          label="Search by TV Show"
          variant="outlined"
          value={tvShowSearchTerm}
          onChange={handleTvShowSearch}
        />
        <Button
          variant="contained"
          onClick={handleRefresh}
          style={{ fontWeight: "bold" }}
        >
          Refresh data
        </Button>
      </StyledSearchContainer>
      {loading ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : filteredCharacters.length === 0 ? (
        <StyledNoResultsMessage>No results found.</StyledNoResultsMessage>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <DataTable
              filteredCharacters={filteredCharacters}
              sortDirection={sortDirection}
              sortField={sortField}
              totalPages={totalPages}
              handleRowClick={handleRowClick}
              handleSort={handleSort}
              handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
              rowsPerPage={rowsPerPage}
              page={page}
            />
            <CharacterModal
              open={openModal}
              onClose={handleCloseModal}
              character={selectedCharacter}
            />
          </Grid>
          <Grid item xs={6}>
            <PieChart filteredCharacters={filteredCharacters} />
            <ExcelExport
              data={filteredCharacters.map((character) => ({
                Name: character.name,
                Films: character.films.join("\n") || "-",
              }))}
              filename="chart_data"
            />
          </Grid>
        </Grid>
      )}
    </StyledContainer>
  );
};

export default DisneyPage;
