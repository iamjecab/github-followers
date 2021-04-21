import React, { useState, useEffect } from "react";
import styled from "styled-components";
import GlobalStyles from "./Components/GlobalStyles";
import Loading from "./Components/Loading";
import arrayOfArray from "./utility/arrayOfArray";

const App = () => {
    const [loading, setLoading] = useState(true);
    const [index, setIndex] = useState(0);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await fetch(
                    "https://api.github.com/users/john-smilga/followers?per_page=20"
                );
                const data = await res.json();
                setData(arrayOfArray(data));
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.log(error);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <GlobalStyles />
            {loading ? (
                <Loading />
            ) : (
                <Container>
                    <Heading>Pagination</Heading>
                    <FollowersList>
                        {data[index].map((element, num) => {
                            const { id, login, avatar_url, html_url } = element;
                            return (
                                <Card key={id}>
                                    <ImgContainer>
                                        <Img src={avatar_url}></Img>
                                    </ImgContainer>
                                    <Name>{login}</Name>
                                    <UserLink href={html_url} target="_blank">
                                        {" "}
                                        view profile
                                    </UserLink>
                                </Card>
                            );
                        })}
                    </FollowersList>
                    <BtnContainer>
                        {data.map((e, num) => {
                            return <Btn key={num}>{num + 1}</Btn>;
                        })}
                    </BtnContainer>
                </Container>
            )}
        </>
    );
};

const Container = styled.main``;

const Heading = styled.h1``;

const FollowersList = styled.section``;

const Card = styled.div``;

const ImgContainer = styled.div``;

const Img = styled.img``;

const Name = styled.h2``;

const UserLink = styled.a``;

const BtnContainer = styled.div``;

const Btn = styled.button``;

export default App;
