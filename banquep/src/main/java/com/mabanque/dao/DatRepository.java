package com.mabanque.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mabanque.entity.Dat;
//interface which defines methods for all the CRUD operations on the entity
public interface DatRepository extends JpaRepository<Dat,Long>{

}
