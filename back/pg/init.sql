--
-- PostgreSQL database dump
--

-- Dumped from database version 14.4 (Debian 14.4-1.pgdg110+1)
-- Dumped by pg_dump version 14.4

-- Started on 2022-07-23 19:10:40

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

--
-- TOC entry 2 (class 3079 OID 16384)
-- Name: adminpack; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS adminpack WITH SCHEMA pg_catalog;


--
-- TOC entry 3419 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION adminpack; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION adminpack IS 'administrative functions for PostgreSQL';


--
-- TOC entry 842 (class 1247 OID 16395)
-- Name: user_level; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.user_level AS ENUM (
    '1',
    '2',
    '3'
);


ALTER TYPE public.user_level OWNER TO postgres;

--
-- TOC entry 845 (class 1247 OID 16403)
-- Name: user_of_course; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.user_of_course AS (
	user_id integer,
	permission_ids integer[]
);


ALTER TYPE public.user_of_course OWNER TO postgres;

--
-- TOC entry 229 (class 1255 OID 16404)
-- Name: auto_clear_email_tokens(); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.auto_clear_email_tokens()
    LANGUAGE sql
    AS $$
    DELETE FROM email_verify WHERE expiration_time < (now() at time zone 'utc');
    $$;


ALTER PROCEDURE public.auto_clear_email_tokens() OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 16405)
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.categories_id_seq OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 212 (class 1259 OID 16406)
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    id integer DEFAULT nextval('public.categories_id_seq'::regclass) NOT NULL,
    title text NOT NULL
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 16412)
-- Name: courses_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.courses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.courses_id_seq OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 16413)
-- Name: courses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.courses (
    id integer DEFAULT nextval('public.courses_id_seq'::regclass) NOT NULL,
    title text,
    description text,
    author_id integer NOT NULL,
    trailer_url text,
    user_level public.user_level,
    preview_description text,
    main_topics text[],
    image_url text
);


ALTER TABLE public.courses OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16431)
-- Name: email_verify; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.email_verify (
    token text NOT NULL,
    expiration_time timestamp without time zone NOT NULL
);


ALTER TABLE public.email_verify OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16436)
-- Name: feedbacks_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.feedbacks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.feedbacks_id_seq OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16437)
-- Name: feedbacks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.feedbacks (
    id integer DEFAULT nextval('public.feedbacks_id_seq'::regclass) NOT NULL,
    course_id integer NOT NULL,
    author_id integer NOT NULL,
    description text,
    date timestamp without time zone NOT NULL,
    mark integer
);


ALTER TABLE public.feedbacks OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16443)
-- Name: module_type_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.module_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.module_type_id_seq OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16444)
-- Name: module_types; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.module_types (
    id integer DEFAULT nextval('public.module_type_id_seq'::regclass) NOT NULL,
    type character varying(16) NOT NULL
);


ALTER TABLE public.module_types OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 16448)
-- Name: modules; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.modules (
    id integer DEFAULT nextval('public.module_type_id_seq'::regclass) NOT NULL,
    local_id integer NOT NULL,
    type_id integer NOT NULL,
    section_id integer NOT NULL,
    title text NOT NULL,
    content text NOT NULL
);


ALTER TABLE public.modules OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16454)
-- Name: permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.permissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;


ALTER TABLE public.permissions_id_seq OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 16455)
-- Name: permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.permissions (
    id integer DEFAULT nextval('public.permissions_id_seq'::regclass) NOT NULL,
    name character varying
);


ALTER TABLE public.permissions OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16461)
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.roles_id_seq OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 16462)
-- Name: sections_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sections_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sections_id_seq OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 16463)
-- Name: sections; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sections (
    id integer DEFAULT nextval('public.sections_id_seq'::regclass) NOT NULL,
    course_id integer NOT NULL,
    local_id integer NOT NULL,
    title text NOT NULL,
    description text NOT NULL
);


ALTER TABLE public.sections OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 16469)
-- Name: user_permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_permissions (
    user_id integer,
    course_id integer,
    permission_id integer
);


ALTER TABLE public.user_permissions OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16419)
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
-- TOC entry 216 (class 1259 OID 16420)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer DEFAULT nextval('public.users_id_seq'::regclass) NOT NULL,
    email character varying(64) NOT NULL,
    password text NOT NULL,
    about text,
    refresh_token text,
    is_verified boolean DEFAULT false NOT NULL,
    avatar_url text,
    first_name character varying(32) NOT NULL,
    second_name character varying(32) NOT NULL,
    third_name character varying(32) NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 3397 (class 0 OID 16406)
-- Dependencies: 212
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categories (id, title) FROM stdin;
1	mmm
\.


--
-- TOC entry 3399 (class 0 OID 16413)
-- Dependencies: 214
-- Data for Name: courses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.courses (id, title, description, author_id, trailer_url, user_level, preview_description, main_topics, image_url) FROM stdin;
\.


--
-- TOC entry 3402 (class 0 OID 16431)
-- Dependencies: 217
-- Data for Name: email_verify; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.email_verify (token, expiration_time) FROM stdin;
\.


--
-- TOC entry 3404 (class 0 OID 16437)
-- Dependencies: 219
-- Data for Name: feedbacks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.feedbacks (id, course_id, author_id, description, date, mark) FROM stdin;
\.


--
-- TOC entry 3406 (class 0 OID 16444)
-- Dependencies: 221
-- Data for Name: module_types; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.module_types (id, type) FROM stdin;
1	HTML_TEXT
2	VIDEO_LINK
\.


--
-- TOC entry 3407 (class 0 OID 16448)
-- Dependencies: 222
-- Data for Name: modules; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.modules (id, local_id, type_id, section_id, title, content) FROM stdin;
\.


--
-- TOC entry 3409 (class 0 OID 16455)
-- Dependencies: 224
-- Data for Name: permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.permissions (id, name) FROM stdin;
1	CAN_VIEW_COURSE
2	CAN_EDIT_COURSE
3	CAN_DELEGATE_PERMISSIONS
4	CAN_CHECK_HOMEWORK
\.


--
-- TOC entry 3412 (class 0 OID 16463)
-- Dependencies: 227
-- Data for Name: sections; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sections (id, course_id, local_id, title, description) FROM stdin;
\.


--
-- TOC entry 3413 (class 0 OID 16469)
-- Dependencies: 228
-- Data for Name: user_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_permissions (user_id, course_id, permission_id) FROM stdin;
\.


--
-- TOC entry 3401 (class 0 OID 16420)
-- Dependencies: 216
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, password, about, refresh_token, is_verified, avatar_url, first_name, second_name, third_name) FROM stdin;
\.


--
-- TOC entry 3420 (class 0 OID 0)
-- Dependencies: 211
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categories_id_seq', 1, true);


--
-- TOC entry 3421 (class 0 OID 0)
-- Dependencies: 213
-- Name: courses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.courses_id_seq', 49, true);


--
-- TOC entry 3422 (class 0 OID 0)
-- Dependencies: 218
-- Name: feedbacks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.feedbacks_id_seq', 50, true);


--
-- TOC entry 3423 (class 0 OID 0)
-- Dependencies: 220
-- Name: module_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.module_type_id_seq', 67, true);


--
-- TOC entry 3424 (class 0 OID 0)
-- Dependencies: 223
-- Name: permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.permissions_id_seq', 1, false);


--
-- TOC entry 3425 (class 0 OID 0)
-- Dependencies: 225
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.roles_id_seq', 4, true);


--
-- TOC entry 3426 (class 0 OID 0)
-- Dependencies: 226
-- Name: sections_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sections_id_seq', 42, true);


--
-- TOC entry 3427 (class 0 OID 0)
-- Dependencies: 215
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 3, true);


--
-- TOC entry 3245 (class 2606 OID 16473)
-- Name: permissions Permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permissions
    ADD CONSTRAINT "Permissions_pkey" PRIMARY KEY (id);


--
-- TOC entry 3229 (class 2606 OID 16475)
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- TOC entry 3243 (class 2606 OID 16477)
-- Name: modules content_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.modules
    ADD CONSTRAINT content_items_pkey PRIMARY KEY (id);


--
-- TOC entry 3233 (class 2606 OID 16479)
-- Name: courses courses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_pkey PRIMARY KEY (id);


--
-- TOC entry 3239 (class 2606 OID 16481)
-- Name: feedbacks feedbacks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.feedbacks
    ADD CONSTRAINT feedbacks_pkey PRIMARY KEY (id);


--
-- TOC entry 3241 (class 2606 OID 16483)
-- Name: module_types module_types_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.module_types
    ADD CONSTRAINT module_types_pkey PRIMARY KEY (id);


--
-- TOC entry 3247 (class 2606 OID 16485)
-- Name: sections sections_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sections
    ADD CONSTRAINT sections_pkey PRIMARY KEY (id);


--
-- TOC entry 3231 (class 2606 OID 16487)
-- Name: categories title; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT title UNIQUE (title);


--
-- TOC entry 3235 (class 2606 OID 16489)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 3237 (class 2606 OID 16491)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3254 (class 2606 OID 16492)
-- Name: user_permissions course_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_permissions
    ADD CONSTRAINT course_id FOREIGN KEY (course_id) REFERENCES public.courses(id) NOT VALID;


--
-- TOC entry 3253 (class 2606 OID 16497)
-- Name: sections course_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sections
    ADD CONSTRAINT course_id FOREIGN KEY (course_id) REFERENCES public.courses(id);


--
-- TOC entry 3248 (class 2606 OID 16502)
-- Name: courses courses_author_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_author_id_fkey FOREIGN KEY (author_id) REFERENCES public.users(id);


--
-- TOC entry 3249 (class 2606 OID 16507)
-- Name: feedbacks feedbacks_author_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.feedbacks
    ADD CONSTRAINT feedbacks_author_id_fkey FOREIGN KEY (author_id) REFERENCES public.users(id);


--
-- TOC entry 3250 (class 2606 OID 16512)
-- Name: feedbacks feedbacks_course_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.feedbacks
    ADD CONSTRAINT feedbacks_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(id);


--
-- TOC entry 3255 (class 2606 OID 16517)
-- Name: user_permissions permission_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_permissions
    ADD CONSTRAINT permission_id FOREIGN KEY (permission_id) REFERENCES public.permissions(id) NOT VALID;


--
-- TOC entry 3251 (class 2606 OID 16522)
-- Name: modules section_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.modules
    ADD CONSTRAINT section_id FOREIGN KEY (section_id) REFERENCES public.sections(id) NOT VALID;


--
-- TOC entry 3252 (class 2606 OID 16527)
-- Name: modules type_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.modules
    ADD CONSTRAINT type_id FOREIGN KEY (type_id) REFERENCES public.module_types(id) NOT VALID;


--
-- TOC entry 3256 (class 2606 OID 16532)
-- Name: user_permissions user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_permissions
    ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES public.users(id) NOT VALID;


-- Completed on 2022-07-23 19:10:40

--
-- PostgreSQL database dump complete
--

