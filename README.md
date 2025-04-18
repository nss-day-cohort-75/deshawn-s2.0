# DeShawn's Dog Walking
**Add your ERD here**

```dbml
// city data
Table cities {
  id int [pk]
  city_name varchar
}

// walker data
Table walkers {
  id int [pk]
  walker_name varchar
}

// join table
Table city_walkers {
  id int [pk]
  city_id int
  walker_id int
}

// dog data
Table dogs {
  id int [pk]
  dog_name varchar
  city_id int
  walker_id int
}

Ref: "cities"."city_name" < "city_walkers"."city_id"

Ref: "walkers"."walker_name" < "city_walkers"."walker_id"

Ref: "cities"."id" < "dogs"."city_id"

Ref: "walkers"."id" < "dogs"."walker_id"
```