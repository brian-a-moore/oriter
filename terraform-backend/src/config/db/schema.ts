import { relations } from 'drizzle-orm';
import { json, text, timestamp, pgTable, uuid } from 'drizzle-orm/pg-core';

export const funeralHome = pgTable('funeral_home', {
  funeralHomeId: uuid('id').primaryKey(),
  addressLine1: text('address_line_1').notNull(),
  addressLine2: text('address_line_2'),
  city: text('city').notNull(),
  state: text('state').notNull(),
  zipCode: text('zip_code').notNull(),
  email: text('email').notNull().unique(),
  phoneNumber: text('phone_number').notNull().unique(),
  funeralHomeName: text('funeral_home_name').notNull(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),
});

export const customer = pgTable('customer', {
  customerId: uuid('id').primaryKey(),
  funeralHomeId: uuid('funeral_home_id')
    .references(() => funeralHome.funeralHomeId)
    .notNull(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  email: text('email').notNull().unique(),
  phoneNumber: text('phone_number').notNull().unique(),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),
});

export const formResponse = pgTable('form_response', {
  responseId: uuid('id').primaryKey(),
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

export const funeralHomeRelations = relations(funeralHome, ({ many }) => ({
  customers: many(customer),
}));

export const customerRelations = relations(customer, ({ one, many }) => ({
  funeralHome: one(funeralHome),
  responses: many(formResponse),
}));

export const formResponseRelations = relations(formResponse, ({ one }) => ({
  customer: one(customer),
}));
