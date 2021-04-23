import React, { useState, useEffect } from "react";
import styled from "styled-components";
import GlobalStyles from "./Components/GlobalStyles";
import Loading from "./Components/Loading";
import arrayOfArray from "./utility/arrayOfArray";

const App = () => {
    const [loading, setLoading] = useState(true);
    const [index, setIndex] = useState(0);
    const [data, setData] = useState([]);
    // const [activeBtn, setActiveBtn] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await fetch(
                    "https://api.github.com/users/bradtraversy/followers?per_page=150"
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

    const pageToggle = (value) => {
        setIndex(value);
    };

    const nextPage = () => {
        if (index === data.length - 1) {
            setIndex(0);
        } else {
            setIndex(index + 1);
        }
    };

    const prevPage = () => {
        if (index === 0) {
            setIndex(data.length - 1);
        } else setIndex(index - 1);
    };

    return (
        <>
            <GlobalStyles />
            {loading ? (
                <Loading />
            ) : (
                <Container>
                    <Heading>Pagination</Heading>
                    <FollowersList>
                        {data[index].map((element) => {
                            const { id, login, avatar_url, html_url } = element;
                            return (
                                <Card key={id}>
                                    <ImgContainer>
                                        <Img src={avatar_url}></Img>
                                    </ImgContainer>
                                    <Name>{login}</Name>
                                    <UserLink href={html_url} target="_blank">
                                        view profile
                                    </UserLink>
                                </Card>
                            );
                        })}
                    </FollowersList>
                    <BtnContainer>
                        <PrevBtn onClick={prevPage}> Prev</PrevBtn>
                        {data.map((e, num) => {
                            return (
                                <Btn
                                    className={num === index ? "active" : null}
                                    key={num}
                                    onClick={() => {
                                        pageToggle(num);
                                    }}
                                >
                                    {num + 1}
                                </Btn>
                            );
                        })}
                        <NextBtn onClick={nextPage}>Next</NextBtn>
                    </BtnContainer>
                </Container>
            )}
        </>
    );
};

const Container = styled.main`
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Heading = styled.h1`
    font-size: 2.2rem;
    padding: 1rem;
`;

const FollowersList = styled.section`
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @media (min-width: 592px) {
        flex-direction: row;
        flex-wrap: wrap;
        width: 100%;
    }
`;

const Card = styled.div`
    box-shadow: 0 4px 8px 4px grey;
    margin: 2rem;
    border-radius: 0.5rem;
    width: 100%;
    min-width: 280px;
    max-width: 400px;
    @media (min-width: 592px) {
        width: 35%;
    }
`;

const ImgContainer = styled.div``;

const Img = styled.img`
    width: 135px;
    border-radius: 50%;
    margin: 0.8rem 0;
`;

const Name = styled.h2`
    margin: 0.8rem 0;
`;

const UserLink = styled.a`
    text-decoration: none;
    padding: 0.4rem;
    background-color: #b3c5dc;
    margin: 2rem;
    display: inline-block;
    padding: 0.4rem 1.5rem;
    border-radius: 1rem;
    color: #011937;
    text-transform: uppercase;
    font-weight: 700;
    vertical-align: center;
    &:hover {
        background-color: #011937;
        color: #eaf9fc;
    }
`;

const BtnContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 1rem;
    button {
        border: none;
        outline: none;
        color: #011937;
        &:hover,
        .active {
            background-color: #011937;
            color: #eaf9fc;
        }
        &:active {
            background-color: #011937;
            color: #eaf9fc;
        }
    }
`;

const PrevBtn = styled.button`
    font-size: 1rem;
    font-weight: 600;
    background-color: inherit;
    padding: 0 0.3rem;
    border-radius: 8px;
`;

const NextBtn = styled.button`
    font-size: 1rem;
    font-weight: 600;
    background-color: inherit;
    padding: 0 0.3rem;
    border-radius: 8px;
`;

const Btn = styled.button`
    padding: 0.5rem;
    margin: 0.7rem;
    width: 2rem;
    background-color: #b3c5dc;
    border-radius: 4px;
`;

export default App;
