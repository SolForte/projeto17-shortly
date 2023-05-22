--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

-- Started on 2023-05-22 09:20:36

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

SET default_table_access_method = heap;

--
-- TOC entry 215 (class 1259 OID 35727)
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    token text NOT NULL,
    "userId" integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- TOC entry 214 (class 1259 OID 35726)
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3343 (class 0 OID 0)
-- Dependencies: 214
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- TOC entry 217 (class 1259 OID 35735)
-- Name: urls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.urls (
    id integer NOT NULL,
    url text NOT NULL,
    "shortUrl" text NOT NULL,
    "userId" integer NOT NULL,
    "visitCount" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- TOC entry 216 (class 1259 OID 35734)
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3344 (class 0 OID 0)
-- Dependencies: 216
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;


--
-- TOC entry 219 (class 1259 OID 35744)
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL
);


--
-- TOC entry 218 (class 1259 OID 35743)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3345 (class 0 OID 0)
-- Dependencies: 218
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 3183 (class 2604 OID 35730)
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- TOC entry 3185 (class 2604 OID 35738)
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- TOC entry 3188 (class 2604 OID 35747)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 3333 (class 0 OID 35727)
-- Dependencies: 215
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.sessions (id, token, "userId", "createdAt") FROM stdin;
1	236d343e-c6f5-4e47-8bd7-b881532629a7	1	2023-05-22 08:25:20.294434
2	677c4677-0b0e-48ea-bc47-59c3ef5a07f6	1	2023-05-22 08:25:25.692332
3	4abdc3a2-3b80-40ac-aa5b-bbb78cbbfcb7	1	2023-05-22 08:33:18.880276
4	6639364a-9c2b-4385-b0d7-fc9717e8adfa	2	2023-05-22 09:01:10.480215
\.


--
-- TOC entry 3335 (class 0 OID 35735)
-- Dependencies: 217
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.urls (id, url, "shortUrl", "userId", "visitCount", "createdAt") FROM stdin;
4	https://a.com	7b1yPGImsn	1	0	2023-05-22 08:36:23.573162
5	https://a.com	n61TbjjSZr	1	0	2023-05-22 08:36:32.233348
6	https://a.com	ugb74NBrYb	1	1	2023-05-22 08:37:33.181313
3	https://a.com	gFMUC1JPpI	1	2	2023-05-22 08:35:50.35257
7	https://a.com	EH-r-pUryp	2	2	2023-05-22 09:01:22.30311
\.


--
-- TOC entry 3337 (class 0 OID 35744)
-- Dependencies: 219
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (id, name, email, password, "createdAt") FROM stdin;
1	João	joao@driven.com.br	$2b$06$XzOaOVifDt4ILCaL3jNVauK3Za1ISEpaceaZwUA32OMPjPKZJAWO2	2023-05-22 08:24:01.198246-03
2	Ricardo	ricardo@driven.com.br	$2b$06$LcsaYBGIAB7S6EeuFI3Cxu7PyuiCZSf6ytB71F2/GseBf7SapMZL.	2023-05-22 08:57:27.030804-03
3	Pedro	Pedro@driven.com.br	$2b$06$KUMmoQUvkWorsswzVeHSduAS439zwHuzxkh6P0YGXatyaZ4z7z.k6	2023-05-22 08:57:34.647139-03
4	Lucius	Lucius@driven.com.br	$2b$06$Xsc291kgNBNvk4aDTnDqQ.vpAuAgf6g88oUJjAkiQeTfJds5lu79i	2023-05-22 09:07:45.05608-03
\.


--
-- TOC entry 3346 (class 0 OID 0)
-- Dependencies: 214
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 4, true);


--
-- TOC entry 3347 (class 0 OID 0)
-- Dependencies: 216
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.urls_id_seq', 7, true);


--
-- TOC entry 3348 (class 0 OID 0)
-- Dependencies: 218
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 4, true);


-- Completed on 2023-05-22 09:20:36

--
-- PostgreSQL database dump complete
--

