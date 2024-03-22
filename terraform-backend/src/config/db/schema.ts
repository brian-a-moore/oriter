import { relations } from 'drizzle-orm';
import { json, text, timestamp, pgTable, uuid, varchar, serial } from 'drizzle-orm/pg-core';

// Tables
export const admin = pgTable('admin', {
  adminId: uuid('admin_id').primaryKey(),
  firstName: varchar('first_name', { length: 128 }).notNull(),
  lastName: varchar('last_name', { length: 128 }).notNull(),
  email: varchar('email', { length: 64 }).unique().notNull(),
  password: text('password').notNull(),
  question_id: serial('question_id')
    .references(() => securityQuestions.questionId)
    .notNull(),
  question_response: text('question_response').notNull(),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),
});

export const customer = pgTable('customer', {
  customerId: uuid('customer_id').primaryKey(),
  funeralHomeId: uuid('funeral_home_id')
    .references(() => funeralHome.funeralHomeId)
    .notNull(),
  firstName: varchar('first_name', { length: 128 }).notNull(),
  lastName: varchar('last_name', { length: 128 }).notNull(),
  email: varchar('email', { length: 64 }).unique().notNull(),
  phoneNumber: varchar('phone_number', { length: 10 }).unique().notNull(),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),
});

export const formResponse = pgTable('form_response', {
  responseId: uuid('response_id').primaryKey(),
  customerId: uuid('customer_id')
    .references(() => customer.customerId)
    .notNull(),
  bio: json('bio'),
  education: json('education'),
  employment: json('employment'),
  family: json('family'),
  info: json('info'),
  service: json('service'),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),
});

export const funeralHome = pgTable('funeral_home', {
  funeralHomeId: uuid('funeral_home_id').primaryKey(),
  addressLine1: varchar('address_line_1', { length: 256 }).notNull(),
  addressLine2: varchar('address_line_2', { length: 128 }),
  city: varchar('city', { length: 128 }).notNull(),
  state: varchar('state', { length: 2 }).notNull(),
  zipCode: varchar('zip_code', { length: 5 }).notNull(),
  email: varchar('email', { length: 64 }).unique().notNull(),
  password: text('password').notNull(),
  question_id: serial('question_id')
    .references(() => securityQuestions.questionId)
    .notNull(),
  question_response: text('question_response').notNull(),
  phoneNumber: varchar('phone_number', { length: 10 }).unique().notNull(),
  funeralHomeName: varchar('funeral_home_name', { length: 256 }).notNull(),
  firstName: varchar('first_name', { length: 128 }).notNull(),
  lastName: varchar('last_name', { length: 128 }).notNull(),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),
});

export const securityQuestions = pgTable('security_questions', {
  questionId: serial('question_id').primaryKey(),
  question: varchar('question', { length: 256 }).notNull(),
});

// Relations
export const adminRelations = relations(admin, ({ one }) => ({
    securityQuestion: one(securityQuestions, {
    fields: [admin.question_id],
    references: [securityQuestions.questionId],
  }),
}));

export const customerRelations = relations(customer, ({ one, many }) => ({
  funeralHome: one(funeralHome, {
    fields: [customer.funeralHomeId],
    references: [funeralHome.funeralHomeId],
  }),
  responses: many(formResponse),
}));

export const formResponseRelations = relations(formResponse, ({ one }) => ({
  customer: one(customer, {
    fields: [formResponse.customerId],
    references: [customer.customerId],
  }),
}));

export const funeralHomeRelations = relations(funeralHome, ({ many, one }) => ({
  securityQuestion: one(securityQuestions, {
    fields: [funeralHome.question_id],
    references: [securityQuestions.questionId],
  }),
  customers: many(customer),
}));

export const securityQuestionsRelations = relations(securityQuestions, ({ many }) => ({
  admins: many(admin),
  funeralHomes: many(funeralHome),
}));