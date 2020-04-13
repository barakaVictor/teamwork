--
-- PostgreSQL database dump
--

-- Dumped from database version 12.0
-- Dumped by pg_dump version 12.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: articlecomments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.articlecomments (
    id integer NOT NULL,
    articleid integer NOT NULL,
    userid integer NOT NULL,
    comment text NOT NULL,
    created_on timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.articlecomments OWNER TO postgres;

--
-- Name: articlecomments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.articlecomments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.articlecomments_id_seq OWNER TO postgres;

--
-- Name: articlecomments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.articlecomments_id_seq OWNED BY public.articlecomments.id;


--
-- Name: articles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.articles (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    article text NOT NULL,
    created_on timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.articles OWNER TO postgres;

--
-- Name: articles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.articles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.articles_id_seq OWNER TO postgres;

--
-- Name: articles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.articles_id_seq OWNED BY public.articles.id;


--
-- Name: gifcomments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.gifcomments (
    id integer NOT NULL,
    gifid integer NOT NULL,
    userid integer NOT NULL,
    comment text NOT NULL,
    created_on timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.gifcomments OWNER TO postgres;

--
-- Name: gifcomments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.gifcomments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.gifcomments_id_seq OWNER TO postgres;

--
-- Name: gifcomments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.gifcomments_id_seq OWNED BY public.gifcomments.id;


--
-- Name: gifs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.gifs (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    public_id character varying(255) NOT NULL,
    size character varying(255) NOT NULL,
    imageurl character varying(255) NOT NULL,
    created_on timestamp without time zone NOT NULL
);


ALTER TABLE public.gifs OWNER TO postgres;

--
-- Name: gifs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.gifs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.gifs_id_seq OWNER TO postgres;

--
-- Name: gifs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.gifs_id_seq OWNED BY public.gifs.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    firstname character varying(100) NOT NULL,
    lastname character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(255) NOT NULL,
    gender character varying(15),
    jobrole character varying(20) NOT NULL,
    department character varying(100) NOT NULL,
    address character varying(100) NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: articlecomments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.articlecomments ALTER COLUMN id SET DEFAULT nextval('public.articlecomments_id_seq'::regclass);


--
-- Name: articles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.articles ALTER COLUMN id SET DEFAULT nextval('public.articles_id_seq'::regclass);


--
-- Name: gifcomments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gifcomments ALTER COLUMN id SET DEFAULT nextval('public.gifcomments_id_seq'::regclass);


--
-- Name: gifs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gifs ALTER COLUMN id SET DEFAULT nextval('public.gifs_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: articlecomments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.articlecomments (id, articleid, userid, comment, created_on) FROM stdin;
1	1	1	Here comes the comment	2019-12-15 10:33:44.878348
2	1	1	Here comes the comment	2019-12-15 10:38:18.021003
3	1	1	Here comes the comment	2019-12-15 10:41:26.182237
4	1	1	Here comes the comment	2019-12-15 10:43:33.712064
5	1	1	Here comes the comment	2019-12-15 10:45:56.864631
6	1	1	Here comes the comment	2019-12-15 10:51:08.586071
7	1	1	Here comes the comment	2019-12-15 10:54:38.699399
8	1	1	Here comes the comment	2019-12-15 10:55:38.806241
\.


--
-- Data for Name: articles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.articles (id, title, article, created_on) FROM stdin;
1	this is a test dummy!!!	Here comes the dummy text	2019-12-15 09:26:50.982489
\.


--
-- Data for Name: gifcomments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.gifcomments (id, gifid, userid, comment, created_on) FROM stdin;
1	1	1	Here goes nothing	2019-12-15 16:35:46.449402
\.


--
-- Data for Name: gifs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.gifs (id, title, public_id, size, imageurl, created_on) FROM stdin;
1	barney	vdxiweiviuc0ueuge724	1244022	https://res.cloudinary.com/baraka/image/upload/v1576416938/vdxiweiviuc0ueuge724.gif	2019-12-15 13:35:38
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, firstname, lastname, email, password, gender, jobrole, department, address) FROM stdin;
1	testadmin	testadmin	testadmin2@example.com	random	male	Developer	IT	100 Downing Street
2	test	test	test@example.com	random	male	Developer	IT	100 downing street
3	test	test	test2@example.com	random	male	Developer	IT	100 downing street
4	test	test	test3@example.com	$2b$10$IHqWn0BtZI6FtoWFXBbXkOo3J7KRrtPes.Aa5ooUoz68BMqCoP8l.	male	Developer	IT	100 downing street
5	test	test	test5@example.com	$2b$10$fsGYq6b/si6HsDXBJXXF0OmTKwz27jmA1tY7Q4P9NRPpcmBEsPPvu	male	Developer	IT	100 downing street
6	testadmin	testadmin	testadmin3@example.com	$2b$10$w3HYlat2oC3jraSZDmmXk.0PT0oRKY4jsiWcMQ.QuHf6snwXNuohC	male	Developer	IT	100 Downing Street
\.


--
-- Name: articlecomments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.articlecomments_id_seq', 8, true);


--
-- Name: articles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.articles_id_seq', 1, true);


--
-- Name: gifcomments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.gifcomments_id_seq', 1, true);


--
-- Name: gifs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.gifs_id_seq', 1, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 6, true);


--
-- Name: articlecomments articlecomments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.articlecomments
    ADD CONSTRAINT articlecomments_pkey PRIMARY KEY (id);


--
-- Name: articles articles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.articles
    ADD CONSTRAINT articles_pkey PRIMARY KEY (id);


--
-- Name: gifcomments gifcomments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gifcomments
    ADD CONSTRAINT gifcomments_pkey PRIMARY KEY (id);


--
-- Name: gifs gifs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gifs
    ADD CONSTRAINT gifs_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: articlecomments articlecomments_articleid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.articlecomments
    ADD CONSTRAINT articlecomments_articleid_fkey FOREIGN KEY (articleid) REFERENCES public.articles(id) ON DELETE CASCADE;


--
-- Name: articlecomments articlecomments_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.articlecomments
    ADD CONSTRAINT articlecomments_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: gifcomments gifcomments_gifid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gifcomments
    ADD CONSTRAINT gifcomments_gifid_fkey FOREIGN KEY (gifid) REFERENCES public.gifs(id) ON DELETE CASCADE;


--
-- Name: gifcomments gifcomments_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gifcomments
    ADD CONSTRAINT gifcomments_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

