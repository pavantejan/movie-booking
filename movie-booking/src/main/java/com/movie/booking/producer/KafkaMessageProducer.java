package com.movie.booking.producer;


import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class KafkaMessageProducer {

//    @Autowired
//    KafkaTemplate<String, String> kafkaTemplate;
//
//    public void send(String message){
//        log.info("Payload enviado: {}", message);
//        kafkaTemplate.send("topic1", message);
//    }
}
