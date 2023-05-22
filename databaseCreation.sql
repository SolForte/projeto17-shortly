CREATE TABLE "sessions" (
    "id" serial NOT NULL,
    "token" text NOT NULL,
    "userId" integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);

CREATE TABLE "urls" (
    "id" serial NOT NULL,
    "url" text NOT NULL,
    "shortUrl" text NOT NULL,
    "userId" integer NOT NULL,
    "visitCount" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);

CREATE TABLE "users" (
    "id" serial NOT NULL,
    "name" text NOT NULL,
    "email" text NOT NULL,
    "password" text NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL
);