import { toast } from "react-toastify";
import { CurrencyType, CurrencyTypeRes } from "../currency/model/currency.type";
import { IUserRepository, LoginPropsReq, LoginPropsRes, PeriodCurrencyPropsReq, RegisterPropsReq, RegisterPropsRes } from "./userRepository";
import { apolloClient } from "../utils/apollo.client";
import { gql } from "@apollo/client";
import { Last15DaysFromInterest } from "../interests/interest.interface";



export class UserApolloRepository implements IUserRepository{
 async getUserIdByToken(): Promise<string> {
  try {
    const result = await apolloClient.query({
      query: gql`
        query getUserIdByToken {
          getUserIdByToken 
        }
      `,
    });
    return result.data.getUserIdByToken
  } catch (err: any) {
    if (err.message === "Failed to fetch") {
      return "Ops, isso não foi possivel no momento";
    }
   return err.networkError.result.errors[0].message;
  }
  }
  async sendLoginRequest(data: LoginPropsReq): Promise<LoginPropsRes | string> {
      try {
          const result = await apolloClient.mutate({
            mutation: gql`
              mutation login($data: LoginUserDTO) {
                login(data: $data) {
                  id
                  token
                  username
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
                  from
                  to
                  name
                  high
                  low
                  create_date
                  id
                }
              }
            `,
          });
          return result.data.searches
        } catch (err: any) {
          console.log(err)
          if (err.message === "Failed to fetch") {
            return "Ops, isso não foi possivel no momento";
          }
          return err.networkError.result.errors[0].message;
        }
  }
  async sendCurrencyRequest(from: string, to: string): Promise<CurrencyTypeRes | string> {
      try {
          const result = await apolloClient.mutate({
            mutation: gql`
              mutation createCurrency($data: CurrencyReq!) {
                createCurrency(data: $data) {
                  id
                  name
                  from,
                  to
                  high
                  low
                  create_date
                }
              }
            `,
            variables: {
              data: {
                  from,
                  to
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
          if (err.message.startsWith("Ops")) {
            return err.message;
          }
          return err.networkError.result.errors[0].message
        }
  }

  async sendPeriodCurrentRequest({endAt,from,startAt,to}: PeriodCurrencyPropsReq):Promise<any>{
  try {
    const result = await apolloClient.mutate({
      mutation: gql`
        mutation createCurrencyByPeriod($data: CreateCurrencyByPeriodDTO!) {
          createCurrencyByPeriod(data: $data) {
            id
            name
            codein,
            code
            high
            low
            create_date
            otherDays{
              timestamp
              high
              low

            }
          }
        }
      `,
      variables: {
        data: {
            from,
            to,
            startAt,
            endAt
        },
      },
    });
    console.log(result)
    return result.data.createCurrencyByPeriod
  } catch (err: any) {
    console.log((err))
    if (err.message === "Failed to fetch") {
      return "Ops, isso não foi possivel no momento"
    }
    if (err.message.startsWith("moeda")) {
      return err.message;
    }
    return err.networkError.result.errors[0].message
  }
  } 
  
  async getLast15DaysFromInterests(): Promise<Last15DaysFromInterest[] | string> {
    try {
      const result = await apolloClient.query({
        query: gql`
          query getUserLast15DaysFromInterests {
            getUserLast15DaysFromInterests {
              code,
              codein
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