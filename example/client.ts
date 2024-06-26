/*
 * Copyright 2023 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import grpc from "npm:@grpc/grpc-js";
import protoLoader from "npm:@grpc/proto-loader";

const PROTO_PATH = "./example/echo.proto";

const msg = {
  messageSequence: 217,
  messageTime: {
    seconds: { low: 1718966537, high: 0, unsigned: false },
    nanos: 250878378
  },
  valuesByUuid: {
    valueDict: {
      "07aa0319-0bc9-5cc4-9d7f-5400429c2ad9": {
        scalarInteger: { value: 39403 },
        qualityInfo: { qualityCode: 192 },
        stateChange: true,
        lastUpdated: { seconds: { low: 1718966537, high: 0, unsigned: false }, nanos: 247683500 }
      },
      "2fe11ba6-b713-53d1-85bf-17ccf6e261bd": {
        scalarFloat: { value: -0.9958083033561707 },
        qualityInfo: { qualityCode: 192 },
        stateChange: true,
        lastUpdated: { seconds: { low: 1718966537, high: 0, unsigned: false }, nanos: 247683500 }
      },
      "6d70fec2-728c-58f2-9b61-1dd2597ecc1b": {
        scalarInteger: { value: -1699249701 },
        qualityInfo: { qualityCode: 192 },
        stateChange: true,
        lastUpdated: { seconds: { low: 1718966537, high: 0, unsigned: false }, nanos: 247683500 }
      },
      "43b4e557-e717-5756-ac2b-42150aa851f7": {
        scalarInteger: { value: 39431 },
        qualityInfo: { qualityCode: 192 },
        stateChange: true,
        lastUpdated: { seconds: { low: 1718966537, high: 0, unsigned: false }, nanos: 247683500 }
      },
      "07aa0319-0bc9-5cc4-9d7f-5400429c2ad0": {
        scalarInteger: { value: 39403 },
        qualityInfo: { qualityCode: 192 },
        stateChange: true,
        lastUpdated: { seconds: { low: 1718966537, high: 0, unsigned: false }, nanos: 247683500 }
      },
      "2fe11ba6-b713-53d1-85bf-17ccf6e261b1": {
        scalarFloat: { value: -0.9958083033561707 },
        qualityInfo: { qualityCode: 192 },
        stateChange: true,
        lastUpdated: { seconds: { low: 1718966537, high: 0, unsigned: false }, nanos: 247683500 }
      },
      "6d70fec2-728c-58f2-9b61-1dd2597ecc12": {
        scalarInteger: { value: -1699249701 },
        qualityInfo: { qualityCode: 192 },
        stateChange: true,
        lastUpdated: { seconds: { low: 1718966537, high: 0, unsigned: false }, nanos: 247683500 }
      },
      "43b4e557-e717-5756-ac2b-42150aa851f3": {
        scalarInteger: { value: 39431 },
        qualityInfo: { qualityCode: 192 },
        stateChange: true,
        lastUpdated: { seconds: { low: 1718966537, high: 0, unsigned: false }, nanos: 247683500 }
      },
      "07aa0319-0bc9-5cc4-9d7f-5400429c2ad4": {
        scalarInteger: { value: 39403 },
        qualityInfo: { qualityCode: 192 },
        stateChange: true,
        lastUpdated: { seconds: { low: 1718966537, high: 0, unsigned: false }, nanos: 247683500 }
      },
      "2fe11ba6-b713-53d1-85bf-17ccf6e261b5": {
        scalarFloat: { value: -0.9958083033561707 },
        qualityInfo: { qualityCode: 192 },
        stateChange: true,
        lastUpdated: { seconds: { low: 1718966537, high: 0, unsigned: false }, nanos: 247683500 }
      },
      "6d70fec2-728c-58f2-9b61-1dd2597ecc16": {
        scalarInteger: { value: -1699249701 },
        qualityInfo: { qualityCode: 192 },
        stateChange: true,
        lastUpdated: { seconds: { low: 1718966537, high: 0, unsigned: false }, nanos: 247683500 }
      },
      "43b4e557-e717-5756-ac2b-42150aa851f8": {
        scalarInteger: { value: 39431 },
        qualityInfo: { qualityCode: 192 },
        stateChange: true,
        lastUpdated: { seconds: { low: 1718966537, high: 0, unsigned: false }, nanos: 247683500 }
      }
    }
  }
}

const packageDefinition = protoLoader.loadSync(
  PROTO_PATH,
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  },
);

const echoProto =
  grpc.loadPackageDefinition(packageDefinition).grpc.examples.echo;

function main() {
  const client = new echoProto.Echo(
    "localhost:50052",
    grpc.credentials.createInsecure(),
  );
  const call = client.bidirectionalStreamingEcho();

  call.on("data", (value) => {
    console.log(`received message: ${value.message.length}`);
  });

  call.on("status", (statusObject) => {
    console.log(
      `received call status with code ${grpc.status[statusObject.code]}`,
    );
  });

  call.on("error", (error) => {
    console.log(`received error ${error}`);
  });

  setInterval(() => {
    call.write({ message: JSON.stringify(msg, undefined, 2) });
  }, 1000);
}

main();
