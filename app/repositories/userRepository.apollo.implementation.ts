import { toast } from "react-toastify";
import { CurrencyType, CurrencyTypeRes } from "../currency/model/currency.type";
import { IUserRepository, LoginPropsReq, LoginPropsRes, RegisterPropsReq, RegisterPropsRes } from "./userRepository";
import { apolloClient } from "../utils/apollo.client";
import { gql } from "@apollo/client";
import { Last15DaysFromInterest } from "../interests/interest.interface";



export class UserApolloRepository implements IUserRepository{


    async sendLoginRequest(data: LoginPropsReq): Promise<LoginPropsRes | string> {
        try {
            const result = await apolloClient.mutate({
              mutation: gql`
                mutation login($data: LoginUserDTO) {
                  login(data: $data) {
                    id
                    token
                  }
                }
              `,
              variables: {
                data: {
                  username: data.username,
                  password: data.password,
                },
              },
            });
            return result
          } catch (err: any) {
            if (err.message === "Failed to fetch") {
              return "Ops, isso não foi possivel no momento";
            }
            return err.message;
          }
    }
    async sendRegisterRequest(data: RegisterPropsReq): Promise<RegisterPropsRes | string> {
        try {
            const result = await apolloClient.mutate({
              mutation: gql`
                mutation registerUser($data: UserDTO) {
                  createUser(data: $data) {
                    id
                  }
                }
              `,
              variables: {
                data: {
                  username: data.username,
                  password: data.password,
                  email: data.email,
                },
              },
            });
            return result.data
          } catch (err: any) {
            if (err.message === "Failed to fetch") {
              toast("Ops, isso não foi possivel no momento");
              return "Ops, isso não foi possivel no momento";
            }
            return err.message;
          }
    }
    async getUserSearches(): Promise<CurrencyTypeRes[] | string> {
        try {
            const result = await apolloClient.query({
              query: gql`
                query searches {
                  searches {
                    code
                    name
                    high
                    low
                    create_date
                    id
                  }
                }
              `,
            });
            toast("Últimas pesquisas carregadas com sucesso!");
            return result.data.searches
          } catch (err: any) {
            if (err.message === "Failed to fetch") {
              return "Ops, isso não foi possivel no momento";
            }
           return err.networkError.result.errors[0].message;
          }
    }
   async sendCurrencyRequest(name: string): Promise<CurrencyTypeRes | string> {
        try {
            const result = await apolloClient.mutate({
              mutation: gql`
                mutation createCurrency($data: CurrencyReq) {
                  createCurrency(data: $data) {
                    name
                    high
                    low
                    create_date
                  }
                }
              `,
              variables: {
                data: {
                    name,
                },
              },
            });
            return result.data.createCurrency
          } catch (err: any) {
            if (err.message === "Failed to fetch") {
              return "Ops, isso não foi possivel no momento"
            }
            if (err.message.startsWith("moeda")) {
              return err.message;
            }
            return err.networkError.result.errors[0].message
          }
    }

    getUserInterests(token: string) {
      throw new Error("Method not implemented.");
    }
    
   async getLast15DaysFromInterests(): Promise<Last15DaysFromInterest[] | string> {
      try {
        const result = await apolloClient.query({
          query: gql`
            query getUserLast15DaysFromInterests {
              getUserLast15DaysFromInterests {
                code,
                name,
                high,
                low,
                varBid,
                timestamp
                lastDays{
                  pctChange
                }
              }
            }
          `,
          fetchPolicy: 'network-only'
        });
        return result.data.getUserLast15DaysFromInterests
      } catch (err: any) {
        if (err.message === "Failed to fetch") {
          return "Ops, isso não foi possivel no momento";
        }
       return err.networkError.result.errors[0].message;
      }
    }
}