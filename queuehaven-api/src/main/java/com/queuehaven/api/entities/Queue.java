package com.queuehaven.api.entities;

import com.queuehaven.api.dtos.QueueMemberDTO;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "queues")
public class Queue {

    private @Id ObjectId mongoId;
    private String queueId;
    private List<QueueMemberDTO> queueMembers;

    public static Queue create() {
        return new Queue();
    }

    public String getQueueId() {
        return queueId;
    }

    public Queue setQueueId(String queueId) {
        this.queueId = queueId;
        return this;
    }

    public List<QueueMemberDTO> getQueueMembers() {
        return queueMembers;
    }

    public Queue setQueueMembers(List<QueueMemberDTO> queueMembers) {
        this.queueMembers = queueMembers;
        return this;
    }

    @Override
    public String toString() {
        return "Queue{" +
                "queueId='" + queueId + '\'' +
                ", queueMembers=" + queueMembers +
                '}';
    }
}
